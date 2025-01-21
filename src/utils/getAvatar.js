function getAvatar(imageName) {
  const encodedImageName = imageName?.replace(/ /g, "%20");

  return `http://localhost:5000/api/v1/image/${encodedImageName}`;
}

export default getAvatar;
