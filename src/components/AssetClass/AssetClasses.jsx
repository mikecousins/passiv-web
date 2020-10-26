import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { H3, P, Edit, H2 } from '../../styled/GlobalElements';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';
import { Button, SmallButton } from '../../styled/Button';
import SymbolSelector from '../PortfolioGroupTargets/TargetBar/SymbolSelector';
import { getData, postData, deleteData } from '../../api/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const InputBox = styled.div`
  border: 1px solid #979797;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  padding: 30px 0 30px 40px;
  margin: 20px;
`;

const NameInput = styled.input`
  width: 60%;
  font-size: 1.7rem;
  font-weight: 500;
  padding: 10px;
  border: 1px solid;
  focus
`;

const AssetClasses = (props) => {
  //   const dispatch = useDispatch();

  const [assetClasses, setAssetClasses] = useState([]);
  const [enteredSymbol, setEnteredSymbol] = useState();
  const [searchSecurity, setSearchSecurity] = useState(false);
  const [selected, setSelected] = useState();
  const [edit, setEdit] = useState(false);
  const [selectToEdit, setSelectToEdit] = useState();

  useEffect(() => {
    // call API to get asset classes for the groupId

    getData('/api/v1/modelAssetClass/').then((res) => {
      setAssetClasses(res.data);
    });

    //if asset classes exist
    // const listOfAssetClasses = [...assetClasses];
    // if (classes) {
    //   classes.map((cls) => {
    //     listOfAssetClasses.push(cls);
    //   });
    // }
    // if no asset asset classes
    // Math.floor(Math.random() * 999),
    // else {
    //   listOfAssetClasses.push({
    //     model_asset_class: {
    //       id: Math.floor(Math.random() * 999),
    //       name: 'New Asset Class',
    //     },
    //     model_asset_class_target: [],
    //   });
    // }

    // setAssetClasses(listOfAssetClasses);
  }, []);

  const handleAddAssetClass = () => {
    const listOfAssetClasses = JSON.parse(JSON.stringify(assetClasses));
    // listOfAssetClasses.push({
    //   model_asset_class: {
    //     id: Math.floor(Math.random() * 999),
    //     name: 'New Asset Class',
    //   },
    //   model_asset_class_target: [],
    // });
    postData('/api/v1/modelAssetClass/').then((res) => {
      listOfAssetClasses.push(res.data);
      setAssetClasses(listOfAssetClasses);
      console.log('add asset classes', listOfAssetClasses);
    });
  };

  const handleDeleteAssetClass = (e, assetClassId) => {
    const classes = [...assetClasses];
    if (assetClassId) {
      classes.map((element, index) => {
        if (element.model_asset_class.id === assetClassId) {
          classes.splice(index, 1);
          deleteData(`/api/v1/modelAssetClass/${element.model_asset_class.id}`);
        }
      });
    }
    setAssetClasses(classes);
    console.log('asset class deletion:', assetClasses);
  };

  const handleAssetClassNameChange = (e, assetClassId) => {
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
        element.model_asset_class_target.push({ symbol: cb });
        postData(`/api/v1/modelAssetClass/${assetClassId}`, {
          model_asset_class: {
            name: element.model_asset_class.name,
          },
          model_asset_class_target: [{ symbol: cb }],
        });
      }
    });
    setAssetClasses(classes);
    setSearchSecurity(false);
    console.log('asset class after adding security:', assetClasses);
  };

  const handleDeleteSecurity = (assetClassId, securityId) => {
    const classes = [...assetClasses];
    classes.map((element) => {
      if (element.model_asset_class.id === assetClassId) {
        element.model_asset_class_target.map((e, index) => {
          if (e.symbol.id === securityId) {
            element.model_asset_class_target.splice(index, 1);
          }
        });
      }
    });
    setAssetClasses(classes);
    console.log('asset classes after deletion', assetClasses);
  };

  const handleBackBtn = () => {
    // classes = assetClasses;
    console.log('Handle Back button: ');
  };

  const handleSearchSecurity = (id) => {
    setSelected(id);
    setSearchSecurity(true);
  };

  const nameChanged = (e, id) => {
    postData(`/api/v1/modelAssetClass/${id}`, {
      model_asset_class: {
        name: e.target.value,
      },
      // loop through all the targets of this asset class saved in the state
      model_asset_class_target: [],
    });
    setEdit(false);
  };

  const onEditName = (id) => {
    setEdit(true);
    setSelectToEdit(id);
  };

  let assetClassBox = assetClasses.map((astClass) => {
    return (
      //? this probably needs to be a separate component

      <InputBox>
        <Button
          style={{
            background: 'transparent',
            color: 'rgb(236, 88, 81)',
            padding: '5px',
            float: 'right',
            margin: '10px',
          }}
          onClick={(e) =>
            handleDeleteAssetClass(e, astClass.model_asset_class.id)
          }
        >
          <FontAwesomeIcon icon={faTrashAlt} size="lg" />
        </Button>
        {edit && selectToEdit === astClass.model_asset_class.id ? (
          <div>
            <NameInput
              type="text"
              value={astClass.model_asset_class.name}
              key={astClass.model_asset_class.id}
              onChange={(e) =>
                handleAssetClassNameChange(e, astClass.model_asset_class.id)
              }
              onKeyPress={(e) =>
                e.key === 'Enter' &&
                nameChanged(e, astClass.model_asset_class.id)
              }
            />
            <hr />
            {/* //! this doesn't work because we need a state to keep track of name change */}
            {/* <SmallButton onClick={nameChanged}>Done</SmallButton> */}
          </div>
        ) : (
          <P>
            <span style={{ fontSize: '28px', fontWeight: 500 }}>
              {astClass.model_asset_class.name}
            </span>
            <Edit onClick={() => onEditName(astClass.model_asset_class.id)}>
              <FontAwesomeIcon icon={faPen} />
              Edit
            </Edit>
          </P>
        )}

        <ul style={{ margin: '30px' }}>
          {astClass.model_asset_class_target.map((e) => {
            return (
              <li
                key={e.symbol.id}
                style={{
                  borderBottom: '1px solid #979797 ',
                  // width: 'fit-content',
                  width: '60%',
                  padding: '10px 0',
                  margin: '10px',
                }}
              >
                <span style={{ marginRight: '2rem', fontWeight: '700' }}>
                  {e.symbol.symbol}
                </span>
                <span>{e.symbol.description}</span>
                <button
                  style={{
                    marginLeft: '40px',
                    color: 'red',
                    fontSize: '1rem',
                  }}
                  onClick={() =>
                    handleDeleteSecurity(
                      astClass.model_asset_class.id,
                      e.symbol.id,
                    )
                  }
                >
                  Delete
                </button>
              </li>
            );
          })}
          {searchSecurity && selected === astClass.model_asset_class.id ? (
            <SymbolSelector
              value={enteredSymbol}
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
              onClick={() =>
                handleSearchSecurity(astClass.model_asset_class.id)
              }
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
