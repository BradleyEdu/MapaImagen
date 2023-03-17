import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IPopUpProps } from './IPopUpProps';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

class PopUp extends React.Component<IPopUpProps> {

  handleClose = () => {
    const {cerrarModal} = this.props;
    cerrarModal();
  };

  render() {
    const {open} = this.props;

    //Aqui le metes las demas propiedades para que las vayas pintando
    const {Title, Descripcion} = this.props.informacion;

    return (
      <div>
        <Modal
          open={open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            {Title}
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {Descripcion}
            </Typography>

            <Typography id="modal-modal-footer">
              Quiubo 
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default PopUp;
