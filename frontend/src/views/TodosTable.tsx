import React from "react";
import { Task } from "../types";
import { Button, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

interface Props {
    tasks: Task[];
}

const TodosTable: React.FC<Props> = ({ tasks }) => {
    const handleTaskDelete = (taskId: number) => {
        // onTaskDelete(taskId);
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tasks.map((task, index) => (
                    <TableRow key={index}>
                        <TableCell padding="checkbox">
                            <Checkbox />
                        </TableCell>
                        <TableCell>{task.text}</TableCell>
                        <TableCell>{task.priority}</TableCell>
                        <TableCell>{task.dueDate || '-'}</TableCell>
                        <TableCell>
                            <Button variant="text" onClick={() => handleTaskDelete(index)}>
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TodosTable;
