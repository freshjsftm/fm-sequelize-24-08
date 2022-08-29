const MAX_LIMIT = 50;
module.exports.paginate = async (req, res, next) => {
  try {
    const {
      query: { limit, offset },
    } = req;
    req.pagination = {
      limit: limit > 0 && limit < MAX_LIMIT ? limit : MAX_LIMIT,
      offset: offset >= 0 ? offset : 0,
    };
    next();
  } catch (error) {
    next(error);
  }
};
