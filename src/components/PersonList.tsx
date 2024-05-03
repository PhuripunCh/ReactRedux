import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Person, deletePerson, loadPersons, deleteSelectedPersons } from '../store/features/personSlice';
import { Button, Table, Select } from 'antd';
import { ColumnType } from 'antd/es/table';
import AddForm from '../components/AddForm';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const PersonList: React.FC<{ editPerson: (person: Person) => void }> = ({ editPerson }) => {

    const [selectedPerson, setSelectedPerson] = useState<Person | undefined>(undefined);
    const { t, i18n } = useTranslation();
    const handleCancel = () => {
        setSelectedPerson(undefined);  
    };


    const dispatch = useAppDispatch();
    const persons = useAppSelector(state => state.person.persons);
    const [selectedRowKeys, setSelectedRowKeys] = useState<(number | string)[]>([]);

    useEffect(() => {
        const storedData = localStorage.getItem('persons');
        if (storedData) {
            dispatch(loadPersons(JSON.parse(storedData)));
        }
    }, [dispatch]);

    const handleDeleteSelected = () => {
        dispatch(deleteSelectedPersons(selectedRowKeys as number[]));
        setSelectedRowKeys([]);
    };

    const handleEditPerson = (person: Person) => {
        setSelectedPerson(person); 
    };

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
      };
    
    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys as (number | string)[]);
        },
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    const columns: ColumnType<Person>[] = [
        {
            title: t('table.name'),
            dataIndex: 'firstName',
            key: 'firstName',
            render: (text, record) => `${record.firstName} ${record.lastName}`,
            sorter: (a, b) => a.firstName.localeCompare(b.firstName),
            align: 'center',
        },
        {
            title: t('table.gender'),
            dataIndex: 'gender',
            key: 'gender',
            align: 'center',
            sorter: (a, b) => a.gender.localeCompare(b.gender),
        },
        {
            title: t('table.telephone'),
            dataIndex: 'telNumber',
            key: 'telNumber',
            align: 'center',
            sorter: (a, b) => a.telNumber.localeCompare(b.telNumber),
        },
        {
            title: t('table.nationality'),
            dataIndex: 'nationality',
            key: 'nationality',
            align: 'center',
            sorter: (a, b) => a.nationality.localeCompare(b.nationality),
        },
        {
            title: t('table.actions'),
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                <>
                    <Button onClick={() => handleEditPerson(record)}>{t('table.edit')}</Button>
                </>
            ),
        },
    ];

    return (
        
        <div style={{ width: '80%',   marginLeft: 'auto' , marginRight:'auto'}}>
            <h1 className="text-center text-2xl font-bold">{t('form.Head_1')}</h1>
            <Select defaultValue="en" onChange={changeLanguage} className="language-select" style={{ marginLeft: '1500px' ,marginBottom:'10px'}}>
            <Select.Option value="en">EN</Select.Option>
            <Select.Option value="th">TH</Select.Option>
          </Select>
          <Link to="/" style={{ textDecoration: 'none' }} >
        <Button type="default" style={{ backgroundColor: 'white', color: 'rgba(0, 0, 0, 0.85)',marginLeft: '1500px' }} >Back to Home</Button>
        </Link>
            <AddForm person={selectedPerson} onCancel={handleCancel} />
            <Button onClick={handleDeleteSelected} disabled={!selectedRowKeys.length} style={{  marginBottom: '10px'}}>Delete Selected</Button>
            <Table 
                rowSelection={rowSelection}
                columns={columns}
                dataSource={persons}
                rowKey="id"
            />
        </div>
    );
};

export default PersonList;
