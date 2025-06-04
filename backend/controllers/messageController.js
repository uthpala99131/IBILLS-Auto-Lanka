const Message = require('../models/Message');

// @desc    Create new message
// @route   POST /api/contact
// @access  Public
exports.createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Message sent successfully!'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: err.message
    });
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages',
      error: err.message
    });
  }
};

// @desc    Update message status
// @route   PUT /api/messages/:id
// @access  Private
exports.updateMessageStatus = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update message',
      error: err.message
    });
  }
};