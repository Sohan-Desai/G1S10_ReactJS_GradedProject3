import { Modal } from 'react-bootstrap'


type Props = {
    title: string | undefined,
    posterurl: string | undefined
    show: boolean | undefined
    onHide: () => void
}

const ImageModal = ({ title, posterurl, show, onHide }: Props) => {
    return (
        <div>
            <Modal
                // size="sm"
                show={show}
                // dialogClassName="modal-90w"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton onClick={onHide}></Modal.Header>
                <Modal.Body>
                    <img src={posterurl} alt={title} className='d-block w-100'></img>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ImageModal
