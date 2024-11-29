import { useEffect, useState } from 'react'
import './RightPanel.css'
import ImageLayout from './ImageLayout'

function RightPanel() {
    const [data, setData] = useState([]);
    const [searchContact, setSearchContact] = useState('');
    const [noResults, setNoResults] = useState(false);

    function handleSearchContact(e) {
        const value = e.target.value;
        setSearchContact(value);

        if (value.trim() === '') {
            fetchAllContacts();
        } else {
            handleSearchSubmit(value);
        } 
    }

    async function handleSearchSubmit(searchQuery) {
        try {
            const response = await fetch(`http://localhost:3500/contacts/search?name=${searchQuery}`);

            if (!response.ok) {
                setNoResults(true);
            }

            const newData = await response.json();

            if (newData.length === 0) {
                setNoResults(true);
                setData([]);
            } else {
                setNoResults(false);
                setData(newData);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    }

    async function fetchAllContacts() {
        try {
            const response = await fetch('http://localhost:3500/contacts');

            if (!response.ok) {
                throw new Error('Failed to fetch contacts');
            }

            const newData = await response.json();
            setData(newData);
            setNoResults(false);
        } catch (error) {
            console.error('Error fetching contacts: ', error);
        }
    }

    useEffect(() => {
        fetchAllContacts();
    }, []);

    return (
        <div className='right_container'>
            <div className='right_header'>
                Contacts
            </div>
            <div className="right_search">
                <input 
                    type="text" 
                    className='right_contactSearch' 
                    placeholder='Search by name'
                    value={searchContact}
                    onChange={handleSearchContact}
                />
                <i className="bi bi-search"></i>
            </div>
            <div className='right_content'>
                {noResults ? (
                    <div>No contacts found</div>
                ) : (
                    data.length > 0 ? (
                        data.map((item, index) => (
                        <ImageLayout key={index} image={item.image} text={item.text} />
                        ))
                    ) : (
                        <div>No contacts found</div>
                    )
                )}
            </div>
        </div>
    )
}

export default RightPanel