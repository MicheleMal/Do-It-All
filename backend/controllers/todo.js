import { connection } from "../services/connMysql.js";

// Prendere tutti i todo
export const getAllTodo = (req, res) => {
  const query = `SELECT *
                    FROM todo`;

  connection.query(query, (err, record) => {
    if (err)
      return res
        .status(400)
        .json({ message: err.message, data: "", check: false });

    try {
      return res
        .status(200)
        .json({ message: "Elenco todo", data: record, check: true });
    } catch (error) {
      return res
        .status(400)
        .json({ message: err.message, data: "", check: false });
    }
  });
};

// Aggiungere nuovo todo
export const addTodo = (req, res) => {
  const { id, title } = req.body;

  const query = `INSERT INTO todo(id, title, completed) 
                    VALUES(${id},"${title}", "false")`;

  connection.query(query, (err, record) => {
    if (err)
      return res
        .status(400)
        .json({ message: err.message, data: "", check: false });

    try {
      return res.status(200).json({
        message: "Todo inserito con successo",
        data: record,
        check: true,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ message: err.message, data: "", check: false });
    }
  });
};

// Modificare un determinato todo
export const modifyTodo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const query = `UPDATE todo set title="${title}" WHERE id=${id}`;

  connection.query(query, (err, record) => {
    if (err)
      return res
        .status(400)
        .json({ message: "", data: err.message, check: false });

    try {
      return res.status(200).json({
        message: "Todo aggiornato con successo",
        data: record,
        check: true,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "", data: err.message, check: false });
    }
  });
};

// Modifica completato todo
export const modifyCompleted = (req, res) => {
  const { id } = req.params;

  const query = `SELECT completed
                    FROM todo
                    WHERE id=${id}`;

  const updateQuery = `UPDATE todo SET completed = CASE WHEN completed = "true" THEN "false" ELSE "true" END WHERE id=${id}`;

  connection.query(query, (error, record) => {
    if (error)
      return res
        .status(400)
        .json({ message: error.message, data: "", check: false });

    try {
      const completedValue = record[0].completed;

      connection.query(updateQuery, (error2, record2) => {
        if (error2)
          return res
            .status(400)
            .json({ message: error.message, data: "", check: false });

        try {
          const newCompletedValue =
            completedValue === "true" ? "false" : "true";
          const message =
            newCompletedValue === "true" ? "Completato" : "Non completato";
          return res
            .status(200)
            .json({ message: message, data: record2, check: true });
        } catch (error) {
          return res
            .status(400)
            .json({ message: error.message, data: "", check: false });
        }
      });
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message, data: "", check: false });
    }
  });

  // connection.query(query, (error, record) => {
  //   if (error)
  //     return res
  //       .status(400)
  //       .json({ message: error.message, data: "", check: false });

  //   try {
  //     if (record[0].completed === "false") {
  //       const query = `UPDATE todo set completed="true" WHERE id=${id}`;
  //       connection.query(query, (error2, record2) => {
  //         if (error2)
  //           return res
  //             .status(400)
  //             .json({ message: error2.message, data: "", check: false });
  //         try {
  //           return res
  //             .status(200)
  //             .json({ message: "Completato", data: record2, check: true });
  //         } catch (error2) {
  //           return res
  //             .status(400)
  //             .json({ message: error2.message, data: "", check: false });
  //         }
  //       });
  //     } else if (record[0].completed === "true") {
  //       const query = `UPDATE todo set completed="false" WHERE id=${id}`;
  //       connection.query(query, (error3, record3) => {
  //         console.log(query);
  //         if (error3)
  //           return res
  //             .status(400)
  //             .json({ message: error3.message, data: "", check: false });
  //         try {
  //           return res
  //             .status(200)
  //             .json({ message: "Non completato", data: record3, check: true });
  //         } catch (error3) {
  //           return res
  //             .status(400)
  //             .json({ message: error3.message, data: "", check: false });
  //         }
  //       });
  //     }
  //     console.log(record[0].completed);
  //   } catch (error) {
  //     return res
  //       .status(400)
  //       .json({ message: error.message, data: "", check: false });
  //   }
  // });
};

// Elimina todo
export const deleteTodo = (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM todo WHERE id=${id}`;

  connection.query(query, (error, record) => {
    if (error)
      return res
        .status(400)
        .json({ message: error.message, data: "", check: false });

    try {
      return res
        .status(200)
        .json({
          message: "Todo eliminato con successo",
          data: record,
          check: true,
        });
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message, data: "", check: false });
    }
  });
};
