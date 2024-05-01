
const jwt = require('jsonwebtoken');

exports.root = async (req, res) => {
    try {
        // Generate a unique guest user ID
        const guestUserId = generateGuestUserId();
        
        // Generate a token for the guest user
        const token = jwt.sign({ id: guestUserId, isGuest: true }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        res.cookie("token", token, {
            httpOnly: true,
          });

         return res.redirect('/index');

    } catch (err) {
        console.error(err);
        res.status(500).send(`Error creating guest token: ${err.message}`);
    }
};

function generateGuestUserId() {
   
    return `guest_${Date.now()}`;
}






