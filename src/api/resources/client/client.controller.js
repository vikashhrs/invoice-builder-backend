import clientService from "./client.service";
import Client from './client.model';
export default {
    async create(req, res) {
        try {
            const { value, error } = clientService.validateCreateSchema(req.body);
            if (error && error.details) {
                return res.status(400).json(error);
            }
            const client = await Client.create(value);
            return res.json(client)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async findAll(req, res) {
        try {
            const clients = await Client.find();
            res.json(clients);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async findOne(req, res) {
        try {
            const { _id } = req.params;
            const client = await Client.findById(_id);
            res.json(client);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async delete(req, res) {
        try {
            const { _id } = req.params;
            const client = await Client.findOneAndRemove({ _id });
            if (client)
                return res.json(client);
            res.status(404).json({ error: "Client found!" })
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async update(req, res) {
        try {
            const { _id } = req.params;
            const { value, error } = clientService.validateUpdateSchema(req.body);
            if (error && error.details) {
                return res.status(400).json(error);
            }
            const client = await Client.findOneAndUpdate({ _id }, value, { new: true });
            if (client)
                return res.json(client);
            res.status(404).json({ error: "Client found!" })
        } catch (error) {
            res.status(500).json(error);
        }
    }
}