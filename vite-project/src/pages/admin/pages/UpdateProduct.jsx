import React, { useContext } from 'react'
import myContext from '../../../context/data/MyContext'

function UpdateProduct() {

    const context = useContext(myContext);
    const { product, setProduct, updateProduct, updateRef } = context;

    return (
        <div>
            <div className=' flex justify-center items-center h-screen'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Update Product</h1>
                    </div>
                    <form ref={updateRef}>
                        <div>
                            <input type="text"
                                value={product.productId}
                                onChange={(e) => setProduct({ ...product, productId: e.target.value })}
                                name='productId'
                                className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                                placeholder='Product Id'
                            />
                        </div>
                        <div>
                            <input type="text"
                                value={product.name}
                                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                name='name'
                                className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                                placeholder='Product name'
                            />
                        </div>
                        <div>
                            <input type="number"
                                value={product.price}
                                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                name='price'
                                className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                                placeholder='Product price'
                            />
                        </div>
                        <div>
                            <textarea cols="30" rows="10" name='description'
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                                placeholder='Product description'>

                            </textarea>
                        </div>
                        <div>
                            <input type="text"
                                value={product.imageURL}
                                onChange={(e) => setProduct({ ...product, imageURL: e.target.value })}
                                name='imageURL'
                                className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                                placeholder='Product imageURL'
                            />
                        </div>
                        <div className=' flex justify-center mb-3'>
                            <button
                                onClick={updateProduct}
                                className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct