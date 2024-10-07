import alert from 'components/messages/SweetAlert';
import React from 'react';
import { Button } from 'react-bootstrap';

const DeleteButton = ({ onDelete, itemId, itemName, buttonLabel = 'Delete' }) => {
    const handleDeleteClick = async () => {
        await alert.confirm(
            'Confirm Deletion',
            `Are you sure you want to delete ${itemName}?`,
            async () => {
                try {
                    await onDelete(itemId);
                    alert.success('Deleted!', `${itemName} has been deleted.`);
                } catch (error) {
                    console.error(`Failed to delete ${itemName}:`, error);
                    alert.error('Error', `There was a problem deleting ${itemName}.`);
                }
            }
        );
    };

    return (
        <Button onClick={handleDeleteClick} size="sm" variant="danger">
            <i className="far fa-trash"></i> {buttonLabel}
        </Button>
    );
};

export default DeleteButton;
