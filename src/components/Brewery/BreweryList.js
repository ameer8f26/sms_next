import React, { Component } from 'react';
import axios from '@/lib/axios'

export default class BreweryList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            breweries: [],
        };
        this.handleShowBrewery = this.handleShowBrewery.bind(this);
    }

    handleShowBrewery(ev) {
        ev.preventDefault();
    }

    componentDidMount() {
        axios
            .get('/api/breweries')
            .then((res) => {
                this.setState(
                    {
                        breweries: res.data.breweries
                    }
                )
            })
            .catch(error => {
                console.log(error);
            })
    }


    render() {

        const breweries = this.state.breweries.map((item) =>
            <tr className="h-16 border border-gray-100 rounded " key={item.id}>
                <td className='p-2'>{item.name}</td>
                <td className='p-2'>{item.brewery_type[0].toUpperCase() + item.brewery_type.slice(1)}</td>
                <td className='p-2'>{item.city}</td>
                <td className='p-2'>{item.country}</td>
                <td className='p-2'>{item.phone}</td>
                <td className='p-2'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' data-id={item.id} onClick={this.handleShowBrewery} >Show Brewery</button>
                </td>
            </tr>
        );
        return (
            
            <div>
                <h4 className='font-medium leading-tight text-xl mt-0 mb-4 text-gray-600'>
                    Here is a list of breweries
                </h4>
                <table className="w-full whitespace-nowrap">
                    <thead className="h-16 border border-gray-100 bg-gray-100 rounded">
                        <tr className=''>
                            <td className='p-2'>Name</td>
                            <td className='p-2'>Brewery Type</td>
                            <td className='p-2'>City</td>
                            <td className='p-2'>Country</td>
                            <td className='p-2'>Phone</td>
                            <td className='p-2'>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {breweries}
                    </tbody>
                </table>
            </div>
        )
    }
}