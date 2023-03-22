import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
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
    const { cerrarModal } = this.props;
    cerrarModal();
  };

  render() {
    const { open } = this.props;

    //Aqui le metes las demas propiedades para que las vayas pintando
    const { Title, Descripcion, Manda, MainRoles, Tools, Process } = this.props.informacion;
    const mandaItem: JSX.Element[] = [];
    const mainRItem: JSX.Element[] = [];

    Manda.forEach((item) => {
      mandaItem.push(<li key={item}>{item}</li>)
    });

    MainRoles.forEach((item) => {
      mainRItem.push(<li key={item}>{item}</li>)
    });



    const jsonTools = JSON.parse(Tools);
    console.log(`desde render ${jsonTools}`);
    const jsonProcess = JSON.parse(Process);
    console.log(jsonProcess);
    const numTools = Object.keys(jsonTools).length;
    const numProcess = Object.keys(jsonTools).length;

    let nombreTools;
    let linkTools;
    let nombreProcess;
    let linkProcess;

    if (numTools === 1) {
      nombreTools = jsonTools[numTools-1].nombre;
      linkTools = jsonTools[numTools-1].link;
    }   

    if (numProcess === 1) {
      nombreProcess = jsonProcess[numProcess-1].nombre;
      linkProcess = jsonProcess[numProcess-1].link;
    }   

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
              <br />
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '13px', textAlign: 'justify' }}>
              <br />
              {Descripcion}
              <br />
            </Typography>
            <br />

            <Typography variant="body1" sx={{ display: 'flex', gap: '2rem', fontSize: '13px' }}>
              <div >
                <strong>Mandatory for:</strong>
                <ul style={{ listStyleType: 'none', margin: 0, padding: 0,}}>
                  {mandaItem}
                </ul>
              </div>
              <div style={{textAlign: 'right'}}>
                <strong>Main Roles Involved:</strong>
                <ul style={{ listStyleType: 'none', margin: 0, padding: 0,}}>
                  {mainRItem}
                </ul>
              </div>
            </Typography>
            <br />

            <Typography variant="body1" sx={{ display: 'flex', gap: '2rem', fontSize: '13px'}}>
              <div>
                <strong>Tools:</strong>
                <br />
                <Link href={linkTools} underline="none" target="_blank" rel="noopener">
                <Button variant="contained" color={nombreTools === 'No tool(s)' ? 'warning' : 'success'}>
                  {nombreTools}
                </Button>
                </Link>
              </div>
              <div>
                <strong>Follow the process:</strong>
                <br />
                <Link href={linkProcess} underline="none" target="_blank" rel="noopener">
                <Button variant="contained" color={nombreProcess === 'No tool(s)' ? 'warning' : 'success'}>
                  {nombreProcess}
                </Button>
                </Link>
              </div>
            </Typography>


          </Box>
        </Modal>
      </div>
    );
  }
}

export default PopUp;
