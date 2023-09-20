import { Todo } from "../models/todo.js";

export const getAllTodoByIdUser = async (req, res) => {
    try {
        const { _id } = req.user;
        const todos = await Todo.find({
            id_user: _id,
        });

        if (!todos.length) {
            return res.status(404).json({
                message: "No todos added",
                data: [],
                check: false,
            });
        }

        return res.status(200).json({
            message: "All todos",
            data: todos,
            check: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: [],
            check: false,
        });
    }
};

export const addTodo = async (req, res) => {
    const { title, description } = req.body;
    const { _id } = req.user;

    if (title === undefined || description === undefined) {
        return res.status(400).json({
            message: "Incorrect information",
            data: [],
            check: false,
        });
    }

    const newTodo = new Todo({
        title: title,
        description: description,
        id_user: _id,
    });
    try {
        await newTodo.save();

        return res.status(201).json({
            message: "Added new todo",
            data: newTodo,
            check: true,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message, data: [], check: false });
    }
};

// Modificare un determinato todo
export const modifyTodo = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const todoUpdate = await Todo.findOneAndUpdate({ _id: id }, data, {new: true});

        if(!todoUpdate){
          return res.status(404).json({
            message: "Todo not found",
            data: [],
            check: false,
        });
        }

        return res.status(200).json({
          message: "Todo update successfully",
          data: todoUpdate,
          check: false
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: [],
            check: false,
        });
    }
};

// Modifica completato todo
export const modifyCompleted = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found",
                data: [],
                check: false,
            });
        }

        todo.completed = todo.completed === true ? false : true;

        await todo.save();

        return res.status(200).json({
            message: "Todo update successfully",
            data: todo,
            check: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: [],
            check: false,
        });
    }
};

//  Elimina todo
export const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todoDelete = await Todo.findOneAndDelete({ _id: id });

        if (!todoDelete) {
            return res.status(404).json({
                message: "Todo not found",
                data: [],
                check: false,
            });
        }

        return res.status(200).json({
            message: "Todo deleted successfully",
            data: [],
            check: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: [],
            check: false,
        });
    }
};
