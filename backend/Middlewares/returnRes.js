const { StatusCodes } = require("http-status-codes")

const notFound = (res, message) => {
    return res.status(StatusCodes.NOT_FOUND).json({msg: message})
}

const Created = (res, message, item) => {
    return res.status(StatusCodes.CREATED).json({msg: message, item})
}

const ServerError = (res, err) => {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err.message})
}


/****************something already exist*******************/
const Conflict = (res, message) => {
    return res.status(StatusCodes.CONFLICT).json({msg: message})
}

/******************fill in complete details*****************/
const badRequest = (res, message) => {
    return res.status(StatusCodes.BAD_REQUEST).json({msg: message})
}

/***************200 success******************/
const Sucess = (res, message, item) => {
    return res.status(StatusCodes.OK).json({msg: message, item})
}

module.exports = {
    notFound,
    Created,
    ServerError,
    Conflict,
    badRequest,
    Sucess,
}