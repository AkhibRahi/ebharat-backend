import React, { useEffect, useRef } from 'react'
import myContext from './MyContext';
import { useState } from 'react';
import axios from 'axios';
import { API } from '../../utils/Constants';
import { toast } from 'react-toastify';

function MyState(props) {

  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';

    }
  }

  //add product//

  const [product, setProduct] = useState({
    productId: "",
    name: "",
    price: "",
    description: "",
    imageURL: ""
  })

  const formRef = useRef()

  const addProduct = (e) => {
    e.preventDefault();
    // console.log("product", product) 
    axios.post(API.addProduct, product).then(
      response => {
        // console.log(response)
        toast.success("Product Added Successfully")
        formRef.current.reset();
        setTimeout(() => {
          window.location.href = ('/dashboard')
        }, 800);
        getProductList();

      },
      error => {
        console.log(error)
        toast.error("Error while Adding the product ")
      }
    )
  }

  // get products//

  const [products, setProducts] = useState([])
  // console.log(products)

  const getProductList = () => {
    axios.get(API.listProducts).then(response => {
      // console.log(response.data)
      setProducts(response.data)
    },
      error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getProductList()
  }, [])


  // get single product//

  // const [singleProduct, setSingleProduct] = useState({})

  // console.log(singleProduct.product)


  // const getSingleProduct = (id) =>{
  //   axios.get(API.singleProduct + "/" + id ).then(
  //     response=>{
  //       // console.log(response.data)
  //       setSingleProduct(response.data)
  //       window.location.href = `/productinfo/${id}`
  //     },
  //     error =>{
  //       console.log(error)
  //     })
  // }
 
  // delete product//

  const deleteProduct = (id) => {
    axios.delete(API.deleteProduct + "/" + id).then(
      response => {
        // console.log(response)
        getProductList();
      },
      error => {
        console.log(error)
      })
  }

  // edit product//

  const [editProductId, setEditProductId] = useState(null)

  const updateRef = useRef()

  const editProduct = (item) => {
    setProduct(item)
    setEditProductId(item.productId);
  }

  const updateProduct = (e) => {
    e.preventDefault()
    axios.put(API.updateProduct + "/" + editProductId, product).then(
      response => {
        console.log(response)
        toast.success("Product Updated successfully");
        updateRef.current.reset()
        setTimeout(() => {
          window.location.href = ('/dashboard')
        }, 800);
        getProductList();
      },
      error => {
        console.log(error)
      })

  }


  // search//

  const [search, setSearch] = useState("")



  return (
    <myContext.Provider value={{
      mode, setMode, toggleMode, product, setProduct, addProduct, getProductList, formRef,
      products, setProducts, deleteProduct, editProduct, updateProduct, updateRef, search, setSearch
    }}>
      {props.children}
    </myContext.Provider>
  )
}

export default MyState;