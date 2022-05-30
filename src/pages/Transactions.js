import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Datauser } from "../components/dataDummys";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";

const Transactions = () => {
  const [state] = useContext(UserContext)
  const [transactions, setTransactions] = useState([]);

  let fetchTransaction = async () => {
    const response = await API.get("/transactions");
    console.log(response);
    setTransactions(response.data.data);
  };

  // Set Duration
  const remainingActive = (startDate, dueDate, idTransaction, idUser) => {
    if (!startDate && !dueDate) {
      return 0;
    }

    const date1 = new Date();
    const date2 = new Date(dueDate);
    const Difference_In_Time = date2.getTime() - date1.getTime();
    const Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
    // Jika Masa aktif telah habis
    if (Difference_In_Days === 0) {
      // Delete Transaction
      const deleteTransaction = async () => {
        try {
          const config = {
            headers: {
              Authorization: "Basic " + localStorage.token,
              "Content-type": "application/json",
            },
          };

          // Delete Transaction
          await API.delete("transaction/" + idTransaction, config);

          let setStatusPayment = {
            setStatusPayment: "Not Active",
          };

          setStatusPayment = JSON.stringify(setStatusPayment);

          await API.patch("user/" + idUser,setStatusPayment, config);
        } catch (error) {
          console.log(error);
        }
      };

      deleteTransaction();
      return 0;
    }
    return Difference_In_Days;
  };

  // Delete Transaksi
  const deleteTransaction = async (idTransaction, idUser) => {
    try {
      console.log("Hapus Transaksi & ubah status user Berhasi!");

      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
      };

      // Delete Transaction
      await API.delete("transaction/" + idTransaction, config);

      // Ubah status subscribe di user jadi false
      let setStatusPayment = {
        setStatusPayment: "Not Active",
      };

      setStatusPayment = JSON.stringify(setStatusPayment);

      await API.patch("user/" + idUser, setStatusPayment, config);

      fetchTransaction();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <div style={{ backgroundColor: "#161616", height: "100vh" }}>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <h1
          className="mb-4 mt-5"
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: "24px",
          }}
        >
          Incoming Transaction
        </h1>
        <div>
          <table className="table table-dark table-striped text-center">
            <thead className="text-danger">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Users</th>
                <th scope="col">Remaining Active</th>
                <th scope="col">Status User</th>
                <th scope="col">Status Payment</th>
              </tr>
            </thead>
            <tbody>
                {transactions?.map((item, index)=>{
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.user.fullName}</td>
                            <td>{remainingActive(item?.startDate, item?.dueDate, item.id, item.user?.id)}/Hari</td>
                            <td className={`status-${item.user.statusPayment}`}>{item.user.statusPayment}</td>
                            <td className={`status-${item.status}`}>{item.status}</td>
                        </tr>
                    )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
