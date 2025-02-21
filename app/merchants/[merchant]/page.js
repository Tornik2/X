import "./merchant.css"

export default async function Merchant({params}) {
     console.log(params.merchant)
    return (
        <h1>{params.merchant}</h1>
    )
}