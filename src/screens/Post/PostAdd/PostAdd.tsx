import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message, Modal, Select } from 'antd'
import { addPost, getUser } from '../../../api'

interface PostAddModalProps {
    modalProps?: any
    onSave?: (payload: { userId: number; title: string; body: string }) => void
}

const PostAddModal: React.FC<PostAddModalProps> = ({
    modalProps,
    onSave,
}) => {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState<any[]>([])
    const [form] = Form.useForm()

    useEffect(() => {
        getUser().then((data: any[]) => {
            setUsers(data)
        })
    }, [])

    const handleSave = async () => {
        try {
            const payload = await form.validateFields()
            setLoading(true)

            await addPost(payload)

            message.success('Post added successfully!')
            onSave?.(payload)

            form.resetFields()
            modalProps?.onCancel?.()
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title="Add New Post"
            centered
            destroyOnClose
            footer={null}
            width={600}
            {...modalProps}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    userId: undefined,
                    title: '',
                    body: '',
                }}
            >
                <Form.Item
                    label="Author"
                    name="userId"
                    rules={[{ required: true, message: 'Please select a user' }]}
                >
                    <Select
                        placeholder="Select a user"
                        loading={!users.length}
                        options={users.map(user => ({
                            label: user.name,
                            value: user.id,
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter title' }]}
                >
                    <Input placeholder="Enter post title" />
                </Form.Item>

                <Form.Item
                    label="Body"
                    name="body"
                    rules={[{ required: true, message: 'Please enter post body' }]}
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="Enter post body"
                    />
                </Form.Item>

                <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        <Button onClick={modalProps?.onCancel}>
                            Cancel
                        </Button>

                        <Button
                            type="primary"
                            loading={loading}
                            onClick={handleSave}
                        >
                            {loading ? 'Creating Post...' : 'Save'}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default PostAddModal
