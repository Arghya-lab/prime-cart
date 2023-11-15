const Address = require("../models/Address");

const createAddress = async (req, res) => {
  try {
    const { customerId } = req.customer;
    const {
      fullName,
      mobileNumber,
      pinCode,
      landmark,
      area,
      city,
      state,
      isDefault,
    } = req.body;
    // if new address is default, then update all other addresses to non-default
    if (isDefault)
      await Address.updateMany({ customerId }, { isDefault: false });
    const newAddress = await Address.create({
      customerId,
      fullName,
      mobileNumber,
      pinCode,
      landmark,
      area,
      city,
      state,
      isDefault,
    });
    res.status(201).json({ success: true, data: newAddress });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed white creating address." });
  }
};

const getAddresses = async (req, res) => {
  try {
    const { customerId } = req.customer;
    const addresses = await Address.find({ customerId }).sort({
      createdAt: -1,
    });
    res.status(201).json({ success: true, data: addresses });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch addresses." });
  }
};

const getAddressById = async (req, res) => {
  try {
    const { customerId } = req.customer;
    const { addressId } = req.params;
    const address = await Address.findOne({ _id: addressId, customerId });
    res.status(201).json({ success: true, data: address });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch address." });
  }
};
const setToDefaultAddress = async (req, res) => {
  try {
    const { customerId } = req.customer;
    const { addressId } = req.params;
    await Address.updateMany({ customerId }, { isDefault: false });
    const address = await Address.findOneAndUpdate(
      { _id: addressId, customerId },
      { isDefault: false },
      { new: true }
    );
    res.status(201).json({ success: true, data: address });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to set as default address." });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { customerId } = req.customer;
    const { addressId } = req.params;
    const {
      fullName,
      mobileNumber,
      pinCode,
      landmark,
      area,
      city,
      state,
      isDefault,
    } = req.body;
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, customerId },
      {
        fullName,
        mobileNumber,
        pinCode,
        landmark,
        area,
        city,
        state,
        isDefault,
      },
      { new: true }
    );
    // if updated address is default, then update all other addresses to non-default
    if (isDefault) {
      await Address.updateMany(
        { customerId, _id: { $ne: addressId } },
        { isDefault: false }
      );
    }
    res.status(201).json({ success: true, data: updatedAddress });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error: "Failed while updating address." });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { customerId } = req.customer;
    const { addressId } = req.params;
    const addressToDelete = await Address.findOne({
      _id: addressId,
      customerId,
    });
    if (!addressToDelete) {
      return res
        .status(404)
        .json({ success: false, error: "Address not found" });
    }
    await Address.deleteOne({ _id: addressId });
    res.status(201).json({ success: true, data: addressToDelete });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed while delete address." });
  }
};

module.exports = {
  createAddress,
  getAddresses,
  getAddressById,
  setToDefaultAddress,
  updateAddress,
  deleteAddress,
};
