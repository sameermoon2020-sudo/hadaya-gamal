const { db } = require('../config/firebase');

exports.registerDevice = async (req, res) => {
  try {
    const userId = req.userId;
    const { deviceToken } = req.body;

    if (!deviceToken) {
      return res.status(400).json({ message: 'Device token is required' });
    }

    await db.collection('users').doc(userId).update({
      deviceToken,
    });

    res.json({ message: 'Device registered' });
  } catch (error) {
    console.log('Register device error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.sendNotification = async (req, res) => {
  try {
    const { userId, title, body } = req.body;

    if (!userId || !title || !body) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists || !userDoc.data().deviceToken) {
      return res.status(404).json({ message: 'User or device token not found' });
    }

    res.json({ message: 'Notification sent' });
  } catch (error) {
    console.log('Send notification error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const userId = req.userId;
    const notificationsSnapshot = await db
      .collection('notifications')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get();

    const notifications = notificationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ data: notifications });
  } catch (error) {
    console.log('Get notifications error:', error);
    res.status(500).json({ message: error.message });
  }
};
