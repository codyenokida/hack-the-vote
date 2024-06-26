export const accessoryImageMap = {
  "../assets/accessories/headwear/red-hat-preview.png": require("../assets/accessories/headwear/red-hat-preview.png"),
  "../assets/accessories/body/yellow-shirt-preview.png": require("../assets/accessories/body/yellow-shirt-preview.png"),
  "../assets/accessories/body/yellow-shirt.png": require("../assets/accessories/body/yellow-shirt.png"),
  "../assets/accessories/righthand/usa-flag.png": require("../assets/accessories/righthand/usa-flag.png"),
  "../assets/accessories/face/sunglasses-preview.png": require("../assets/accessories/face/sunglasses-preview.png"),
  "../assets/accessories/bag/green-purse-preview.png": require("../assets/accessories/bag/green-purse-preview.png"),
  "../assets/accessories/headpin/heart-pin-preview.png": require("../assets/accessories/headpin/heart-pin-preview.png"),
};

export const shopAccessories: Accessory[] = [
  {
    accessory_id: "red-hat",
    accessory_name: "Red Hat",
    cost: 200,
    type: "Headwear",
    previewUrl: "../assets/accessories/headwear/red-hat-preview.png",
    overlayUrl: "../assets/accessories/headwear/red-hat-preview.png",
  },
  {
    accessory_id: "yellow-shirt",
    accessory_name: "Yellow shirt",
    cost: 400,
    type: "Body",
    previewUrl: "../assets/accessories/body/yellow-shirt-preview.png",
    overlayUrl: "../assets/accessories/body/yellow-shirt.png",
  },
  {
    accessory_id: "usa-flag",
    accessory_name: "USA flag",
    cost: 200,
    type: "Righthand",
    previewUrl: "../assets/accessories/righthand/usa-flag.png",
    overlayUrl: "../assets/accessories/righthand/usa-flag.png",
  },
  {
    accessory_id: "vote-sunglasses",
    accessory_name: "Vote sunglasses",
    cost: 200,
    type: "Face",
    previewUrl: "../assets/accessories/face/sunglasses-preview.png",
    overlayUrl: "../assets/accessories/face/sunglasses-preview.png",
  },
  {
    accessory_id: "green-purse",
    accessory_name: "Green purse",
    cost: 200,
    type: "Bag",
    previewUrl: "../assets/accessories/bag/green-purse-preview.png",
    overlayUrl: "../assets/accessories/bag/green-purse-preview.png",
  },
  {
    accessory_id: "heart-pin",
    accessory_name: "Heart pin",
    cost: 200,
    type: "Headpin",
    previewUrl: "../assets/accessories/headpin/heart-pin-preview.png",
    overlayUrl: "../assets/accessories/headpin/heart-pin-preview.png",
  },
];
