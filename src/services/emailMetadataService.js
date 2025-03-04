import EmailMetadata from '../models/emailMetadata.js';

export async function createEmailMetadata(data) {
    try {
        const emailMetadata = await EmailMetadata.create(data);
        return emailMetadata;
    } catch (error) {
        throw new Error('Error creating email metadata: ' + error.message);
    }
}

export async function getEmailMetadataByUserId(userId) {
    try {
        const emailMetadata = await EmailMetadata.find({ userId });
        return emailMetadata;
    } catch (error) {
        throw new Error('Error getting email metadata: ' + error.message);
    }
}