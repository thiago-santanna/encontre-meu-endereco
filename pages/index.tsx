import type { NextPage } from "next";
import Head from "next/head";
import axios from "../providers/axios";
import { useState } from "react";
import { ICep } from "../types/cep";
import InputMask from "react-input-mask";
import Mapa from "../components/mapa";

const Home: NextPage = () => {
  const [cep, setCep] = useState<ICep | any>({});
  const [inputCep, setInputCep] = useState<string>("");

  function handleGetCep() {
    const cepLimpo = inputCep.replace(/\.|\-/g, "");
    axios
      .get(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      .then(function (response) {
        const getCep: ICep = response.data;
        setCep(getCep);
        console.log(cep);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Head>
        <title>Procure seu Endereço</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="mx-auto h-screen overflow-hidden flex flex-col items-center justify-center bg-stone-400">
        <h1 className="text-3xl font-bold m-4 p-4">Pesquise seu CEP</h1>
        <p className="mb-6">Informe um CEP válido.</p>
        <div className="px-4 gap-2 overflow-hidden flex items-center justify-center">
          <InputMask
            mask="99.999-999"
            value={inputCep}
            onChange={(event) => {
              setInputCep(event.target.value);
            }}
            className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <button
            type="button"
            onClick={handleGetCep}
            className="w-full px-4 py-2 tracking-wide text-white text-center transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            <span className="text-lg">Consultar...</span>
          </button>
        </div>
        <div className="grid grid-cols-2 w-full md:max-w-3xl p-4 m-4">
          <span className="p-4 bg-blue-200 border border-solid gap-1">
            logradouro: <span>{cep.logradouro}</span>
          </span>
          <span className="p-4 bg-slate-300 border border-solid gap-1">
            complemento: <span>{cep.complemento}</span>
          </span>

          <span className="p-4 bg-slate-300 border border-solid gap-1">
            bairro: <span>{cep.bairro}</span>
          </span>
          <span className="p-4 bg-slate-300 border border-solid gap-1">
            ibge: <span>{cep.ibge}</span>
          </span>

          <span className="p-4 bg-slate-300 border border-solid gap-1">
            localidade: <span>{cep.localidade}</span>
          </span>
          <span className="p-4 bg-slate-300 border border-solid gap-1">
            ddd: <span>{cep.ddd}</span>
          </span>
        </div>

        <Mapa />
      </div>
    </>
  );
};

export default Home;
