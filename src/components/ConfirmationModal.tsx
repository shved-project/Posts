import Button from "./Button";
import Modal from "./Modal";

type ConfirmationModalProps = {
	actionForm: () => void;
	stateModal: (value: React.SetStateAction<boolean>) => void;
	modalText: string;
	actionButtonText: string;
	cancelButtonText?: string;
};

const ConfirmationModal = ({
	actionForm,
	stateModal,
	modalText,
	actionButtonText,
	cancelButtonText = "Отменить",
}: ConfirmationModalProps) => {
	return (
		<Modal setShowModal={stateModal}>
			<p className='text-lg'>{modalText}</p>
			<form action={actionForm} className='flex items-center justify-end mt-10 gap-4'>
				<Button bgColor='blue' type='button' onClick={() => stateModal(false)}>
					{cancelButtonText}
				</Button>
				<Button bgColor='red' type='submit'>
					{actionButtonText}
				</Button>
			</form>
		</Modal>
	);
};

export default ConfirmationModal;
