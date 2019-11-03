function createResponse(type, data, pagination) {
  if (type === 'list') {
    return {
      list: [...data],
      total_item: data.length
    };
  } else if (type === 'object') {
    return {
      data: { ...data }
    };
  } else {
    return { message: 'unknown response' };
  }
}

module.exports = createResponse;
