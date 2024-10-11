"use client"

import { useRouter } from "next/navigation";
import Head from "next/head";
import { useState, useEffect } from "react";
import { claimPrize, finishDispute, getDispute, placeBet } from "@/services/Web3Service";

export default function Bet() {

  const { push } = useRouter();
  const [message, setMessage] = useState();
  const [dispute, setDispute] = useState({
    candidate1: "Loading...",
    candidate2: "Loading...",
    condidate3: "Loading...",
    image1: "https://i.ibb.co/Jt0yNFF/carregando.jpg",
    image2: "https://i.ibb.co/Jt0yNFF/carregando.jpg",
    image3: "https://i.ibb.co/Jt0yNFF/carregando.jpg",
    total1: 0,
    bets1: 0,
    total2: 0,
    bets2: 0,
    total3: 0,
    bets3: 0,
    winner: 0,
  });

  useEffect(() => {
    if (!localStorage.getItem("wallet")) return push("/")
    setMessage("Obtendo dados da disputa...")
    getDispute().then(dispute => {
      setDispute(dispute)
      console.log("Dispute", dispute)
      setMessage("");
    }).catch(err => {
      console.error(err)
      setMessage(err.message || err);
    }
    )
  }, []);


  function processBet(candidate) {
    setMessage("Conectando na carteira.... aguarde...");
    const amount = prompt("Quantidade em POL para aporstar:", "1")
    placeBet(candidate, amount).then(() => alert("Aposta recebida com sucesso. Pode demorar até 1 minuto para que paareça no sistema."))
      .catch((err) => {
        console.error(err)
        setMessage(err.message)
      })
  }

  function btnClaimClick() {
    setMessage("Conectando na carteira.... aguarde...");
    claimPrize().then(() => alert("Premio coletado com sucesso. Pode demorar até 1 minuto para que paareça na sua carteira."))
      .catch((err) => {
        console.error(err)
        setMessage(err.message)
      })
  }

  const winner = Number(dispute.winner)


  return (
    <>
      <Head>
        <title> RityBet | Apostar </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container px-4 py-5">
        <div className="row align-items-center">
          <h1 className="display-5 fw-bold  text-body-emphasis lh-1 mb-3">RityBet</h1>
          <p className="lead">Apostas nas eleições Ritapolitanas</p>
          {
            winner == 0 ?
              <p className="lead">Vc tem ate o dia da eleição apara votar no seu candidato</p>
              :
              <p className="lead">Disputa encerrada. Veja o vencedor abaixo e solicite seu prêmio.</p>
          }
        </div>
        <div className="row flex-lg-row-reverse align-items-center g-1 py-5">
          <div className="col"></div>
          {
            winner == 0 || winner === 1 ?
              <div className="col">
                <h3 className="my-2 d-block mx-auto" style={{ width: 250 }}>
                  {dispute.candidate1}
                </h3>
                <img src={dispute.image1} className="d-block mx-auto img-fluid rounded" width={250} />
                {
                  winner == 0 ?
                    <button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{ width: 250 }} onClick={() => processBet(1)} > Aposto nesse candidato </button>
                    : <button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{ width: 250 }} onClick={() => btnClaimClick(1)} > Pegar meu Prêmio </button>
                }  <span className="badge text-bg-secondary d-block mx-auto" style={{ width: 250 }}>{`${dispute.total1} POL Apostados - ${dispute.bets1}`}</span>
              </div>
              :
              <></>
          }
          {
            winner == 0 || winner === 2 ?
              <div className="col">
                <h3 className="my-2 d-block mx-auto" style={{ width: 250 }}>
                  {dispute.candidate2}
                </h3>
                <img src={dispute.image2} className="d-block mx-auto img-fluid rounded" width={250} />
                {
                  winner == 0 ?
                    <button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{ width: 250 }} onClick={() => processBet(2)} > Aposto nesse candidato </button>
                    : <button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{ width: 250 }} onClick={() => btnClaimClick(2)} > Pegar meu Prêmio </button>
                }
                <span className="badge text-bg-secondary d-block mx-auto" style={{ width: 250 }}>{`${dispute.total2} POL Apostados - ${dispute.bets2}`}</span>
              </div>
              :
              <></>
          }
          {
            winner == 0 || winner === 3 ?
              <div className="col">
                <h3 className="my-2 d-block mx-auto" style={{ width: 250 }}>
                  {dispute.candidate3}
                </h3>
                <img src={dispute.image3} className="d-block mx-auto img-fluid rounded" width={250} />
                {
                  winner == 0 ?
                    <button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{ width: 250 }} onClick={() => processBet(3)} > Aposto nesse candidato </button>
                    : <button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{ width: 250 }} onClick={() => btnClaimClick(3)} > Pegar meu Prêmio </button>
                }
                <span className="badge text-bg-secondary d-block mx-auto" style={{ width: 250 }}>{`${dispute.total3} POL Apostados - ${dispute.bets3}`}</span>
              </div>
              :
              <></>
          }
        </div>
        <div className="row align-items-center">
          <p className="message">
            {message}
          </p>
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
