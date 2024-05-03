import React, { useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Row, Col, Radio, message } from 'antd';
import { useAppDispatch } from '../store/store';
import { Person, addPerson, editPerson } from '../store/features/personSlice';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
interface AddFormProps {
    person?: Person | null; // เพิ่ม `null` ในประเภท
    onCancel: () => void;
}


const AddForm: React.FC<AddFormProps> = ({ person, onCancel }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { Option } = Select;
    const { t, i18n } = useTranslation();
    useEffect(() => {
        form.setFieldsValue({
            ...person,
            dob: person && person.dob ? moment(person.dob) : null,
        });
    }, [person, form]);

    const onFinish = (values: any) => {
        const personDetails = {
            ...values,
            dob: values.dob ? values.dob.format('YYYY-MM-DD') : null,
            id: person  ? person.id : Date.now(),
        };
    
        if (person && person.id) {
            dispatch(editPerson(personDetails)); // Dispatch edit action if ID exists
        } else {
            dispatch(addPerson(personDetails)); // Dispatch add action if no ID (new entry)

            console.log(personDetails)
        }
    
        form.resetFields();
        onCancel();
        message.success('Person saved successfully!');
    };

    return (
      <div className="form-container">
      <div className="form-box">
          <Form form={form} onFinish={onFinish}>
              <Row gutter={16}>
                  <Col span={6}>
                      <Form.Item name="prefix" label={t('form.prefix')} rules={[{ required: true, message: t('messages.selectTitle') }]}>
                          <Select placeholder={t('form.selectTitle')}>
                              <Select.Option value={t('form.mr')}>{t('form.mr')}</Select.Option>
                              <Select.Option value={t('form.mrs')}>{t('form.mrs')}</Select.Option>
                              <Select.Option value={t('form.ms')}>{t('form.ms')}</Select.Option>
                          </Select>
                      </Form.Item>
                  </Col>
                  <Col span={9}>
                      <Form.Item name="firstName" label={t('form.firstName')} rules={[{ required: true, message: t('messages.inputFirstName') }]}>
                          <Input placeholder={t('form.firstName')} />
                      </Form.Item>
                  </Col>
                  <Col span={9}>
                      <Form.Item name="lastName" label={t('form.lastName')} rules={[{ required: true, message: t('messages.inputLastName') }]}>
                          <Input placeholder={t('form.lastName')} />
                      </Form.Item>
                  </Col>
              </Row>
              <Row gutter={16}>
                  <Col span={9}>
                      <Form.Item name="dob" label={t('form.dob')} rules={[{ required: true, message: t('messages.chooseDOB') }]}>
                          <DatePicker style={{ width: '100%' }} />
                      </Form.Item>
                  </Col>
                  <Col span={9}>
                      <Form.Item name="nationality" label={t('form.nationality')} rules={[{ required: true, message: t('messages.inputNationality') }]}>
                          <Input placeholder={t('form.nationality')} />
                      </Form.Item>
                  </Col>
              </Row>
              <Form.Item name="idCardNumber" label={t('form.idCardNumber')} rules={[{ required: true, message: t('messages.inputIDCardNumber') }]}>
                  <Input placeholder={t('form.idCardNumber')} style={{ width: '60%' }}/>
              </Form.Item>
              <Form.Item name="gender" label={t('form.gender')}>
                  <Radio.Group>
                      <Radio value="male">{t('form.male')}</Radio>
                      <Radio value="female">{t('form.female')}</Radio>
                      <Radio value="notSpecified">{t('form.notSpecified')}</Radio>
                  </Radio.Group>
              </Form.Item>
              <Row gutter={16}>
              <Col span={9}>
              <Form.Item name="mobileNumber" label={t('form.mobileNumber')}>
                  <Input.Group compact>
                      <Select defaultValue={form.getFieldValue('mobileNumber')} onChange={(value) => form.setFieldsValue({mobileNumber: value})} style={{ width: '100%' }}>
                          <Select.Option value="+1">+1</Select.Option>
                          <Select.Option value="+44">+44</Select.Option>
                          <Select.Option value="+49">+49</Select.Option>
                          <Select.Option value="+66">+66</Select.Option>
                          <Select.Option value="+91">+91</Select.Option>
                      </Select>
                  </Input.Group>
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item name="telNumber" >
                  <Input style={{ width: '100%' }} placeholder={t('form.telNumber')} />
              </Form.Item>
              </Col>
              </Row>
              <Form.Item name="passportNumber" label={t('form.passportNumber')} rules={[{ required: true, message: t('messages.inputPassportNumber') }]}>
                  <Input placeholder={t('form.passportNumber')} style={{ width: '60%' }}/>
              </Form.Item>
              <Form.Item name="expectedSalary" label={t('form.expectedSalary')} rules={[{ required: true, message: t('messages.inputExpectedSalary') }]}>
                  <Input type="number" placeholder={t('form.expectedSalary')} style={{ width: '60%' }}/>
              </Form.Item>
              <Form.Item>
                  <Button type="default" htmlType="reset" style={{ marginRight: '20px' }}>{t('form.clear')}</Button>
                  <Button type="primary" htmlType="submit">{t('form.submit')}</Button>
              </Form.Item>
          </Form>
      </div>
  </div>
    );
};

export default AddForm;