import jwt from 'jsonwebtoken';
import userService from './user.service';
import User from './user.model';
import { devConfig } from '../../../config/env/development';

export default {
    async signup(req, res) {
        try {
            const { error, value } = userService.validateSchema(req.body);
            if (error && error.details) {
                return res.status(400).send(error);
            }
            const user = await User.create(value);
            return res.json(user);
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    async login(req, res) {
        const { error, value } = userService.validateSchema(req.body);
        if (error && error.details) {
            return res.status(400).send(error);
        }
        const user = await User.findOne({ email: value.email });
        if (!user)
            return res.status(401).json({ error: 'Unauthorized!' })
        const isMatch = await user.comparePassword(value.password);
        if (!isMatch)
            return res.status(403).json({ error: 'Invalid credentials!' })
        const token = jwt.sign({ _id: user._id }, devConfig.secret, { expiresIn: '1d' });
        return res.json({ success: true, token });
    },
    async test(req, res) {
        return res.json(req.user);
    }
}