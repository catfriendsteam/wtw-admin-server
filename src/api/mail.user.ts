import express, { Request, Response } from 'express';

function scheduledMail() {}

function listMail() {}

function getMailById() {}

function updateMailById() {}

function deleteMailById() {}

const router = express.Router();
router.get('/list', listMail);
router.get('/', getMailById);
router.post('/', scheduledMail);
router.put('/', updateMailById);
router.delete('/', deleteMailById);
