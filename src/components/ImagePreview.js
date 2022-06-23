import { FormGroup } from "reactstrap"

const ImagePreview = ({ image }) => {
    let imagePreview =
        <p
            style={{ color: 'lightseagreen', fontStyle: 'italic' }}
        >
            New image is not selected yet
        </p>
    if (image) {
        imagePreview =
            <FormGroup>
                <img
                    src={URL.createObjectURL(image)}
                    style={{ height: 80, width: 80 }}
                    alt='Image preview'
                />
            </FormGroup>
    }
    return imagePreview;
}

export default ImagePreview;