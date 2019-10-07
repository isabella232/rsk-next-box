import styles from '../static/styles/index-styles';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { web3Mainnet, web3Testnet } from '../utils/web3-util';

function Index(props) {
  const UpdateButton = () => (
    <Button variant="success" onClick={() => updateBestBlocks()}>
      Update block number
    </Button>
  );

  const [mainnetBlock, setMainnetBlock] = useState(1);
  const [testnetBlock, setTestnetBlock] = useState(1);
  const [updateComponent, setUpdateComponent] = useState(<UpdateButton />);
  const [bestBlockLoading, setBestBlockLoading] = useState(true);

  useEffect(() => {
    const initBestBlock = async () => {
      const mainnetBestBlock = await web3Mainnet.eth.getBlockNumber();
      const testnetBestBlock = await web3Testnet.eth.getBlockNumber();
      setMainnetBlock(mainnetBestBlock);
      setTestnetBlock(testnetBestBlock);
      setBestBlockLoading(false);
    }
    initBestBlock()
  }, []);

  async function updateBestBlocks() {
    setUpdateComponent(<Spinner animation="border" variant="success" />);
    setMainnetBlock(await web3Mainnet.eth.getBlockNumber());
    setTestnetBlock(await web3Testnet.eth.getBlockNumber());
    setUpdateComponent(<UpdateButton />);
  }

  const BestBlock = props => {
    return (
      <>
        {!props.loading ? (
          <div>
            <h4>Mainnet best block {props.mainnetBlock}</h4>
            <br />
            <h4>Testnet best block {props.testnetBlock}</h4>
          </div>
        ) : (
          <Spinner animation="border" variant="success" />
        )}
      </>
    );
  };

  return (
    <div className="body">
      {styles}
      <div>
        <img className="rsk-logo" />
      </div>
      <h1 className="header">Welcome To RSK + Next JS Truffle Box</h1>
      <br />
      <Form>
        <Form.Group>
          <BestBlock
            mainnetBlock={mainnetBlock}
            testnetBlock={testnetBlock}
            loading={bestBlockLoading}
          />
        </Form.Group>
        <br />
        {updateComponent}
      </Form>
    </div>
  );
}

export default Index;
