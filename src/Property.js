import React, { useState } from 'react'
import { Form, Grid, Label, TextArea } from 'semantic-ui-react'
import { useSubstrateState } from './substrate-lib'

export default function Main() {
  const [status, setStatus] = useState(null)
  const [methodLabel, setMethodLabel] = useState(null)
  const [collectionId, setCollectionId] = useState(1020) // Initial collectionId
  const [metaData, setMetaData] = useState('')
  const [propertyClassAttribute, setPropertyAttribute] = useState('') 
  // eslint-disable-next-line no-unused-vars
  const [nftAttributes, setNFTAttributes] = useState('')
  const [nftPrice, setNFTPrice] = useState(0)// State to hold metadata

  const [nftMetadata, setNFTMetadata] = useState('')

  const { keyring } = useSubstrateState()

  const { api } = useSubstrateState()

  const handleClick = async () => {
    try {
      const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
      const alicePair = keyring.getPair(ALICE);

      const create_class = api.tx.uniques.create(collectionId, alicePair.address);

      await create_class.signAndSend(alicePair, ({ events = [], status }) => {
        console.log('Transaction status:', status.type);
        if (status.isInBlock) {
          setStatus({ type: 'success', message: 'Transaction successful with hash: ' + status.asInBlock.toHex() + ' '+ status.type });
          setCollectionId(prevId => prevId + 1); // Increment collectionId by 1
        } else {
          setStatus({ type: 'error', message: 'Status of transaction: ' + status.type });
        }

        events.forEach(({ event: { method } }) => {
          console.log(method);
          setMethodLabel(method);
        });
      });
    } catch (error) {
      console.error('Error:', error);
      setStatus({ type: 'error', message: 'Error: ' + error.message });
    }
  }

  // Sets metadata for an NFT
  const handleSetNFTMetadata = async () => {
    const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
    // eslint-disable-next-line no-unused-vars
    const alicePair = keyring.getPair(ALICE);

    const collectionId = 1020;
    const itemId = 1;
    const metadata = {
      uri: "https://NEOSEA.io/property/1",
      properties: {
          key1: 'value1',
          key2: 'value2'
      }
    };

    const isFrozen  = false;

    const tx = api.tx.uniques.setMetadata(collectionId, itemId, metadata, isFrozen);

    try {
      await tx.signAndSend(alicePair, ({ events = [], status }) => {
        console.log('Transaction status:', status.type);
        if (status.isInBlock) {
          setStatus({ type: 'success', message: 'Transaction successful with hash: ' + status.asInBlock.toHex() + ' '+ status.type });
        } else {
          setStatus({ type: 'error', message: 'Status of transaction: ' + status.type });
        }

        events.forEach(({ event: { method } }) => {
          console.log(method);
          setMethodLabel(method);
        });
      });
    
    }
    catch (error) {
      console.error('Error:', error);
      setStatus({ type: 'error', message: 'Error: ' + error.message });
    }
  }


  const handleSetNFTPrice = async () => {
    const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

    // Property company's address is the initial owner of an NFT (Item)
    const alicePair = keyring.getPair(ALICE);

    // These two fields are optional 
    const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
    const bobPair = keyring.getPair(BOB);


    const collectionId = 1020;
    const itemId = 1;
    const nftPrice = 10;
    const whiteListBuyerAddress = bobPair.address;

    const tx = api.tx.uniques.setPrice(collectionId, itemId, nftPrice, whiteListBuyerAddress);

    try {
      await tx.signAndSend(alicePair, ({ events = [], status }) => {
        console.log('Transaction status:', status.type);
        if (status.isInBlock) {
          setStatus({ type: 'success', message: 'Transaction successful with hash: ' + status.asInBlock.toHex() + ' '+ status.type });
        } else {
          setStatus({ type: 'error', message: 'Status of transaction: ' + status.type });
        }

        events.forEach(({ event: { method } }) => {
          console.log(method);
          setMethodLabel(method);
        });
      });
    
    } catch (error) {
      console.error('Error:', error);
      setStatus({ type: 'error', message: 'Error: ' + error.message });
    }

  }

  // Mints an NFT
  const handleCreateNFT = async () => {


    // this must be selected from a dropdown or from the selected property category.
    const collectionId = 1020;
    // Auto Increment field
    const itemId = 1;

    const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

    // Property company's address is the initial owner of an NFT (Item)
    const alicePair = keyring.getPair(ALICE);
  
    // prepare transaction to mint an NFT (a  Property)
    // A given collection can have zero or many items
    const tx = api.tx.uniques.mint(
      collectionId,
      itemId, 
      alicePair.address,
    )

    // Here we are sign and send a transaction
    try {
      await tx.signAndSend(alicePair, ({ events = [], status }) => {
        console.log('Transaction status:', status.type);
        if (status.isInBlock) {
          setStatus({ type: 'success', message: 'Transaction successful with hash: ' + status.asInBlock.toHex() + ' '+ status.type });
        } else {
          setStatus({ type: 'error', message: 'Status of transaction: ' + status.type });
        }

        events.forEach(({ event: { method } }) => {
          console.log(method);
          setMethodLabel(method);
        });
      });
    
    } catch (error) {
      console.error('Error:', error);
      setStatus({ type: 'error', message: 'Error: ' + error.message });
    }
  }

  // eslint-disable-next-line no-unused-vars
  const handleSetCollectionAttributes = async () => {
    try {
      const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
      const alicePair = keyring.getPair(ALICE);

      const collectionId = 1020;
      const collectionAttributeKey = 'collectionAttributeKey';
      // eslint-disable-next-line no-unused-vars
      const collectionAttributeValue = {
        // eslint-disable-next-line no-undef
        class: "collectionA",
        owner: alicePair.address,
        data: {
          key1: 'value1',
          key2: 'value2'
        }
      };

      const tx = api.tx.uniques.setAttribute(
        collectionId,
        null, 
        collectionAttributeKey, 
        collectionAttributeValue
      )

      await tx.signAndSend(alicePair, ({ events = [], status }) => {
        console.log('Transaction status:', status.type);
        if (status.isInBlock) {
          setStatus({ type: 'success', message: 'Transaction successful with hash: ' + status.asInBlock.toHex() + ' '+ status.type });
          setCollectionId(prevId => prevId + 1); // Increment collectionId by 1
        } else {
          setStatus({ type: 'error', message: 'Status of transaction: ' + status.type });
        }
        events.forEach(({ phase, event: { data, method, section } }) => {
          console.log(phase.toString() + ' : ' + section + '.' + method + ' ' + data.toString());
        });
      });
        
    } catch (error) {
      console.error('Error:', error);
      setStatus({ type: 'error', message: 'Error: ' + error.message });
    }
  }

  // Handler function for setting collection metadata
  const handleSetCollectionMetaData = async () => {
    try {
        const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
        const alicePair = keyring.getPair(ALICE);

        const metadata = {
            uri: metaData,
            properties: {
                key1: 'value1',
                key2: 'value2'
            }
        };

        // Step 1: Convert the JSON object to a string
        const jsonString = JSON.stringify(metadata);

        // Step 2: Convert the string to its hexadecimal representation
        const metadataHex = Buffer.from(jsonString).toString('hex');

        console.log(metadataHex);

        const collectionId = 1020;
        // eslint-disable-next-line no-unused-vars
        const maxPropertiesPerClass = 10;

        

        const tx = api.tx.uniques.setCollectionMetadata(collectionId, jsonString, false)
        
        // Sets the metadata for the collection
        await tx.signAndSend(alicePair, ({ events = [], status }) => {
          console.log('Transaction status:', status.type);
          if (status.isInBlock) {
            setStatus({ type: 'success', message: 'Transaction successful with hash: ' + status.asInBlock.toHex() + ' '+ status.type });
            setCollectionId(prevId => prevId + 1); // Increment collectionId by 1
          } else {
            setStatus({ type: 'error', message: 'Status of transaction: ' + status.type });
          }
          events.forEach(({ phase, event: { data, method, section } }) => {
            console.log(phase.toString() + ' : ' + section + '.' + method + ' ' + data.toString());
          });
        });

        // new Promise(resolve => setTimeout(resolve, 10000));

        // Set Maximum Items per NFT Collection
        // const setMaxCollectionTx =  api.tx.uniques.setCollectionMaxSupply(collectionId, maxPropertiesPerClass)
        // await setMaxCollectionTx.signAndSend(alicePair, ({ events = [], status }) => {
        //   console.log('Transaction status:', status.type);
        //   if (status.isInBlock) {
        //     setStatus({ type: 'success', message: 'Transaction successful with hash: ' + status.asInBlock.toHex() + ' '+ status.type });
        //     setCollectionId(prevId => prevId + 1); // Increment collectionId by 1
        //   } else {
        //     setStatus({ type: 'error', message: 'Status of transaction: ' + status.type });
        //   }
        //   events.forEach(({ phase, event: { data, method, section } }) => {
        //     console.log(phase.toString() + ' : ' + section + '.' + method + ' ' + data.toString());
        //   });
        // });
      } catch (error) {
        console.error('Error:', error);
        setStatus({ type: 'error', message: 'Error: ' + error.message });
      }
  }

  return (
    <Grid.Column width={8}>
      <h1>Property</h1>
      <Form>
        <Form.Field style={{ textAlign: 'center' }}>
          <button onClick={handleClick}>Create Collection</button>
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>
          {status && (
            <Label color={status.type === 'success' ? 'green' : 'yellow'}>
              {status.message}
            </Label>
          )}
          {methodLabel && (
            <Label color={getColorForMethod(methodLabel)}>
              Method: {methodLabel}
            </Label>
          )}
          {/* Display the new collectionId in a new label */}
          <Label color='green' style={{ fontWeight: 'bold' }}>
            New Collection ID: {collectionId}
          </Label>
        </div>
        {/* Text area for entering collection metadata */}
        <Form.Field>
          <label>Collection Meta Data:</label>
          <TextArea
            placeholder='Enter collection metadata...'
            value={metaData}
            onChange={(e) => setMetaData(e.target.value)}
          />
        </Form.Field>
        {/* Button to set collection metadata */}
        <Form.Field style={{ textAlign: 'center' }}>
          <button onClick={handleSetCollectionMetaData}>Set Collection Meta Data</button>
        </Form.Field>
        <Form.Field>
          <label>Collection Attribute, Key Value Only</label>
          <TextArea
            placeholder='Enter Property collection key and a value'
            value={propertyClassAttribute}
            onChange={(e) => setPropertyAttribute(e.target.value)}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <button onClick={handleSetCollectionAttributes}>Set Collection Attributes</button>
        </Form.Field>
        <Form.Field>
          <label>Now we gonna mint an NFT</label>
          <TextArea
            placeholder='Enter Property collection key and a value'
            value={nftAttributes}
            onChange={(e) => setPropertyAttribute(e.target.value)}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <button onClick={handleCreateNFT}>Create NFT</button>
        </Form.Field>
        
        <Form.Field>
          <label>Set NFT price</label>
          <TextArea
            placeholder='Enter NFT price in NEOS'
            value={nftPrice}
            onChange={(e) => setNFTPrice(e.target.value)}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <button onClick={handleSetNFTPrice}>Set NFT Price</button>
        </Form.Field>

        <Form.Field>
          <label>Set NFT price</label>
          <TextArea
            placeholder='Enter NFT Metadata'
            value={nftMetadata}
            onChange={(e) => setNFTMetadata(e.target.value)}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <button onClick={handleSetNFTMetadata}>Set NFT Price</button>
        </Form.Field>

      </Form>
    </Grid.Column>
  )
}

function getColorForMethod(method) {
  switch (method) {
    case 'Withdraw':
      return 'orange';
    case 'TransactionFeePaid':
      return 'purple';
    case 'ExtrinsicFailed':
      return 'red';
    default:
      return 'orange';
  }
}
