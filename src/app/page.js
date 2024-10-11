"use client"

import { doLogin } from "@/services/Web3Service";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const [message, setMessage] = useState()
  const { push } = useRouter();

  function btnLoginClick() {
    // push("/bet")
    setMessage("Conectando na carteira.... Aguarde.")
    doLogin()
      .then(account => push("/bet"))
      .catch(err => {
        console.error(err)
        setMessage(err.message)
      })
  }
  return (
    <>
      <Head>
        <title> RityBet | Login </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-6">
            <img src="https://i.ibb.co/xD2LnGp/imagem-capa.png" className="d-block mx-lg-auto img-fluid" width="700" height="500" />
          </div>
          <div className="col-6">
            <h1 className="display-5 fw-bold  text-body-emphasis lh-1 mb-3">RityBet</h1>
            <p className="lead">Apostas nas eleições Ritapolitanas</p>
            <p className="lead">Autentique-se com sua carteira e deixe sua aposta para essa eleição.</p>
            <div className="d-flex justfy-content-start">
              <button type="button" className="btn btn-primary btn-lg px-4" onClick={btnLoginClick} >
                <img src="/metamask.svg" width="64" className="me-3" />
                Conectar com a MetaMask
              </button>
            </div>
            <p className="message">
              {message}
            </p>
          </div>
        </div>
        <footer className="d-flex flex-wrap justify-content-between align-itens-center py-3 my4 border-top">
          <p className="col-4 mb-0 text-body-secondary">
            &copy; 2024 RityBet, Inc
          </p>
          <ul className="nav col-4 justfy-content-end">
            <li className="nav-item">
              <a href="/" className="nav-link px-2 text-body-secondary">Home</a>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link px-2 text-body-secondary">About</a>
            </li>

          </ul>
        </footer>
      </div>
    </>
  );
}
