import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  const addTask = () => {
    if (taskTitle.trim()) {
      setTasks(prevTasks => [
        ...prevTasks,
        {
          id: Date.now().toString(),
          title: taskTitle,
          completed: false
        }
      ]);
      setTaskTitle('');
    }
  };

  const toggleTaskCompletion = id => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={item.completed ? styles.completedTask : styles.task}>
              {item.title}
            </Text>
            <Button
              title={item.completed ? 'Undo' : 'Complete'}
              onPress={() => toggleTaskCompletion(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  task: {
    fontSize: 16
  },
  completedTask: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray'
  }
});

export default TaskManager;