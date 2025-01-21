function getAvatar(imageName) {
  const encodedImageName = imageName?.replace(/ /g, "%20");

  return `${process.env.REACT_APP_API_BASE_URL}/image/${encodedImageName}`;
}

export default getAvatar;
