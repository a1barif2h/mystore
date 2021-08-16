import { parseCookies } from 'nookies';
import { useState } from "react";
import AddProductForm from "../../components/AddProductForm";
import baseUrl from '../../helpers/baseUrl';

const Index = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mediaUrl = await imageUploadHandler()
    const response = await fetch(`${baseUrl}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        mediaUrl,
        description,
      }),
    });
    const result = await response.json();

    if (result.error) {
      M.toast({ html: result.error, classes: "red" });
    } else {
      M.toast({ html: result.success, classes: "green" });
      setName("")
      setPrice("")
      setMedia("")
      setDescription("")
      // Arif09-08-2019semi
    }
  };

  const imageUploadHandler = async () => {
    const data = new FormData()
    data.append('file', media)
    data.append('upload_preset',"mystore")
    data.append('cloud_name',"asal")
    const response = await fetch(`https://api.cloudinary.com/v1_1/asal/image/upload`, {
      method: "POST",
      body: data
    })
    const result = await response.json()
    return result.url
  }


  return (
    <>
      <AddProductForm
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        media={media}
        setMedia={setMedia}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const cookie = parseCookies(context)
  const user = cookie.user ? JSON.parse(cookie.user) : ''
  if(!cookie.token) {
    const {res} = context
    res.writeHead(302, {location: '/login'})
    res.end()
  }

  if(user.role === 'user') {
    const {res} = context
    res.writeHead(302, {location: '/'})
    res.end()
  }

  return {
    props: {}
  }
}

export default Index;
