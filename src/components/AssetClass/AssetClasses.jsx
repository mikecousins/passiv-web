import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';
import { Button } from '../../styled/Button';
import SymbolSelector from '../PortfolioGroupTargets/TargetBar/SymbolSelector';

const InputBox = styled.div`
  border: 1px solid #979797;
  width: 80%;
  height: 100%;
  box-sizing: border-box;
  padding: 30px 0 30px 40px;
  margin: 20px;
`;

const NameInput = styled.input`
  width: 60%;
  font-size: 1.7rem;
  font-weight: 500;
  &:focus {
    outline: none;
  }
  &:hover {
    border-bottom: 1px solid #979797;
  }
`;

const AssetClasses = () => {
  let classes = [
    {
      model_asset_class: {
        id: '2bcd7cc3-e922-4976-bce1-9858296801c3',
        name: 'Bonds',
      },
      model_asset_class_target: [
        {
          description: 'Tesla Inc',
          id: '81a0ae8c-f3a0-4126-8c77-25d18ef5fba3',
          symbol: 'TSLA',
          currency: {
            id: 'c485d36a-617b-4b68-a366-d80e27be6a69',
            code: 'USD',
            name: 'US Dollar',
          },
        },
      ],
    },
  ];

  const [assetClasses, setAssetClasses] = useState([]);
  const [enteredSecurity, setEnteredSecurity] = useState();
  const [searchBar, setSearchBar] = useState(false);

  useEffect(() => {
    // call API to get asset classes for the groupId

    //if asset classes exist
    const listOfAssetClasses = assetClasses;
    if (classes) {
      classes.map((cls) => {
        listOfAssetClasses.push(cls);
      });
    }
    // if no asset asset classes
    // Math.floor(Math.random() * 999),
    else {
      listOfAssetClasses.push({
        model_asset_class: {
          id: Math.floor(Math.random() * 999),
          name: 'New Asset Class',
        },
        model_asset_class_target: [],
      });
    }

    setAssetClasses(listOfAssetClasses);
  }, []);

  const handleAddAssetClass = () => {
    const listOfAssetClasses = assetClasses;
    listOfAssetClasses.push({
      model_asset_class: {
        id: Math.floor(Math.random() * 999),
        name: 'New Asset Class',
      },
      model_asset_class_target: [],
    });
    setAssetClasses(listOfAssetClasses);
    console.log(assetClasses);
  };

  const handleAssetClassDelete = (e, assetClassId) => {
    const classes = [...assetClasses];
    if (assetClassId) {
      classes.map((element, index) => {
        if (element.model_asset_class.id === assetClassId) {
          classes.splice(index, 1);
        }
      });
    }
    setAssetClasses(classes);
    console.log('asset class deletion:', assetClasses);
  };

  const assetClassNameChange = (e, assetClassId) => {
    const classes = [...assetClasses];
    if (assetClassId) {
      classes.map((element) => {
        if (element.model_asset_class.id === assetClassId) {
          element.model_asset_class.name = e.target.value;
        }
      });
    }
    setAssetClasses(classes);
    console.log('asset class name change:', assetClasses);
  };

  const handleAddSecurity = (cb, assetClassId) => {
    const classes = [...assetClasses];
    classes.map((element) => {
      if (element.model_asset_class.id === assetClassId) {
        element.model_asset_class_target.push(cb);
      }
    });
    setAssetClasses(classes);
    setSearchBar(false);
    console.log('asset class after adding security:', assetClasses);
  };

  const deleteAssetHandler = (assetClassId, securityId) => {
    const classes = [...assetClasses];

    classes.map((element) => {
      if (element.model_asset_class.id === assetClassId) {
        element.model_asset_class_target.map((e, index) => {
          if (e.id === securityId) {
            element.model_asset_class_target.splice(index, 1);
          }
        });
      }
    });
    setAssetClasses(classes);
    console.log('asset classes after deletion', assetClasses);
  };

  const handleBackBtn = () => {
    classes = assetClasses;
    console.log('Handle Back button: ', classes);
  };

  const clicked = () => {
    setSearchBar(true);
  };

  let assetClassBox = assetClasses.map((astClass) => {
    return (
      //? this probably needs to be a separate component

      <InputBox>
        <Button
          style={{
            backgroundColor: 'red',
            padding: '5px',
            float: 'right',
            margin: '10px',
          }}
          onClick={(e) =>
            handleAssetClassDelete(e, astClass.model_asset_class.id)
          }
        >
          Delete
        </Button>
        <NameInput
          type="text"
          value={astClass.model_asset_class.name}
          key={astClass.model_asset_class.id}
          onChange={(e) =>
            assetClassNameChange(e, astClass.model_asset_class.id)
          }
        />
        <ul style={{ margin: '30px' }}>
          {astClass.model_asset_class_target.map((e) => {
            return (
              <li
                key={e.id}
                style={{
                  borderBottom: '1px solid #979797 ',
                  width: '60%',
                  padding: '10px 0',
                  margin: '10px',
                }}
              >
                <span style={{ marginRight: '2rem', fontWeight: '700' }}>
                  {e.symbol}
                </span>
                <span>{e.description}</span>
                <button
                  style={{
                    marginLeft: '40px',
                    color: 'red',
                    fontSize: '1rem',
                  }}
                  onClick={() =>
                    deleteAssetHandler(astClass.model_asset_class.id, e.id)
                  }
                >
                  Delete
                </button>
              </li>
            );
          })}
          {searchBar ? (
            <SymbolSelector
              value={enteredSecurity}
              onSelect={(cb) =>
                handleAddSecurity(cb, astClass.model_asset_class.id)
              }
            />
          ) : (
            <li
              style={{
                borderBottom: '1px solid #979797 ',
                width: '60%',
                padding: '10px 0',
                cursor: 'pointer',
                margin: '10px',
              }}
              onClick={clicked}
            >
              Add security in this asset class
            </li>
          )}
        </ul>
      </InputBox>
    );
  });

  return (
    <ShadowBox>
      {assetClassBox}
      <Button style={{ background: '#2833CB' }} onClick={handleAddAssetClass}>
        + Add Asset Class
      </Button>
      <Button
        style={{
          background: 'transparent',
          border: '1px solid #2833CB',
          color: '#2833CB',
        }}
        onClick={handleBackBtn}
      >
        Back to Model Portfolio
      </Button>
    </ShadowBox>
  );
};

export default AssetClasses;
