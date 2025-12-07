import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { ShopperContext } from "../../context/Context";

export default function Edit() {
  const { id } = useParams();
  const { products } = useContext(ShopperContext);
  const prod = products?.find((p) => p._id === id);
  let BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [product, setProduct] = useState({
    title: "",
    category: "",
    price: "",
    inStock: "",
    sizes: "",
    discountPrice: 0,
    images: [],    // existing images as full URLs for preview
    newImages: [], // File objects selected in this session
  });

  // store preview URLs for newFiles so we can revoke them on remove or unmount
  const [previews, setPreviews] = useState([]); // array of {id, url}

  useEffect(() => {
    if (prod) {
      setProduct({
        title: prod.title || "",
        category: prod.category || "",
        price: prod.price || "",
        inStock: prod.inStock || "",
        sizes: prod.sizes || "",
        discountPrice: prod.discountPrice != null ? prod.discountPrice : 0,
        images: prod.image
          ? prod.image.map((img) => `${BACKEND_URL}/uploads/images/${img}`)
          : [],
        newImages: [],
      });
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prod]);

  // cleanup previews on unmount
  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // add files
    const newFiles = [...product.newImages, ...files];

    // create preview URLs and map to ids (use timestamp + index)
    const newPreviews = files.map((f, i) => ({
      id: `${Date.now()}_${i}`,
      url: URL.createObjectURL(f),
    }));

    setProduct((prev) => ({ ...prev, newImages: newFiles }));
    setPreviews((prev) => [...prev, ...newPreviews]);

    // clear the input value so same file can be reselected if needed
    e.target.value = "";
  };

  // Remove an existing image (those fetched from prod)
  const removeExistingImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Remove a newly added file by index
  const removeNewImage = (index) => {
    // revoke the corresponding preview url (we assume previews are in same order)
    const previewToRemove = previews[index];
    if (previewToRemove) URL.revokeObjectURL(previewToRemove.url);

    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setProduct((prev) => ({
      ...prev,
      newImages: prev.newImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("title", product.title);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("inStock", product.inStock);
      formData.append("sizes", product.sizes);
      formData.append("discountPrice", product.discountPrice);

      // Important: your backend expects req.files to exist for any newly uploaded images.
      // Multer will populate req.files when we append File objects under the key that multer expects.
      // Your controller checks `if (req.files && req.files.length > 0)` and then deletes old images.
      // So: when uploading new images, append them as files under the key "image"
      if (product.newImages.length > 0) {
        product.newImages.forEach((file) => {
          formData.append("image", file); // <-- send as files named "image"
        });
        // Do NOT send existing images (backend will delete old ones)
      } else {
        // No new files uploaded.
        // If user removed some existing images and saved, we should send the remaining filenames
        // so the DB gets updated (backend will not delete files on disk in this branch).
        // product.images are full URLs; convert to filenames.
        product.images.forEach((url) => {
          const filename = url.split("/").pop();
          formData.append("image", filename); // send strings for the image field
        });
      }

      const res = await fetch(`${BACKEND_URL}/api/products/edit/${id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(`Update failed (${res.status}) ${text || ""}`);
      }

      // success
      navigate("/admin");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Update failed. Check server logs.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6 text-lg font-semibold">Loading product...</p>;

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <p className="text-gray-500">Update product details</p>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow">
        {/* Title */}
        <div>
          <label className="block font-semibold text-gray-700">Product Title</label>
          <input type="text" name="title" value={product.title} onChange={handleChange} className="w-full border rounded-lg p-2 mt-1" />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold text-gray-700">Category</label>
          <input type="text" name="category" value={product.category} onChange={handleChange} className="w-full border rounded-lg p-2 mt-1" />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold text-gray-700">Price</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full border rounded-lg p-2 mt-1" />
        </div>

        {/* Stock */}
        <div>
          <label className="block font-semibold text-gray-700">Stock</label>
          <input type="number" name="inStock" value={product.inStock} onChange={handleChange} className="w-full border rounded-lg p-2 mt-1" />
        </div>

        {/* Sizes */}
        <div>
          <label className="block font-semibold text-gray-700">Sizes</label>
          <input type="text" name="sizes" value={product.sizes} onChange={handleChange} placeholder="e.g. S, M, L" className="w-full border rounded-lg p-2 mt-1" />
        </div>

        {/* Discount Price */}
        <div>
          <label className="block font-semibold text-gray-700">Discount Price</label>
          <input type="number" name="discountPrice" value={product.discountPrice} onChange={handleChange} className="w-full border rounded-lg p-2 mt-1" />
        </div>

        {/* Images */}
        <div className="col-span-2">
          <label className="block font-semibold text-gray-700 mb-2">Images</label>

          {/* Existing images */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            {product.images.map((img, i) => (
              <div key={`existing-${i}`} className="relative group">
                <img src={img} alt={`existing-${i}`} className="w-full h-32 object-cover rounded-lg border" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(i)}
                  className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* New Images Preview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            {product.newImages.map((file, i) => {
              const preview = previews[i] ? previews[i].url : URL.createObjectURL(file);
              // if a preview wasn't created earlier (edge case), create one now (and store it)
              if (!previews[i]) {
                const p = { id: `${Date.now()}_${i}`, url: preview };
                setPreviews((prev) => {
                  // avoid duplicate append if already present
                  const copy = [...prev];
                  copy[i] = p;
                  return copy;
                });
              }
              return (
                <div key={`new-${i}`} className="relative group">
                  <img src={preview} alt={`new-${i}`} className="w-full h-32 object-cover rounded-lg border" />
                  <button
                    type="button"
                    onClick={() => removeNewImage(i)}
                    className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          {/* Upload New Images */}
          <div className="border border-dashed border-gray-400 rounded-lg p-5 text-center">
            <input type="file" accept="image/*" multiple id="uploadImageInput" className="hidden" onChange={handleImageUpload} />
            <label htmlFor="uploadImageInput" className="cursor-pointer text-blue-600 font-semibold">+ Upload Images</label>
            <p className="text-gray-500 text-sm mt-1">Selecting images will <strong>replace</strong> existing images on the server (because backend deletes old images if files are uploaded).</p>
            <p className="text-gray-500 text-sm mt-1">If you only removed some existing images and do not upload new ones, those removals will be saved without deleting files from disk.</p>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="col-span-2 flex justify-end">
          <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <Save size={18} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
