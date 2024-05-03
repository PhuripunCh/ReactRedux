import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Person {
    id: number;
    prefix: string;
    firstName: string;
    lastName: string;
    dob: string | null;
    nationality: string;
    idCardNumber: string;
    gender: string;
    mobileNumber: string;
    telNumber: string;
    passportNumber: string;
    expectedSalary: number;
}

interface PersonState {
    persons: Person[];
    selectedPerson: Person | null;  // This will store the currently selected person for editing
}

const initialState: PersonState = {
    persons: [],
    selectedPerson: null,  // No person is selected initially
};

export const PersonSlice = createSlice({
    name: "person",
    initialState,
    reducers: {
        loadPersons: (state, action: PayloadAction<Person[]>) => {
            state.persons = action.payload;
        },

        addPerson: (state, action: PayloadAction<Omit<Person, 'id'>>) => {
            const maxId = state.persons.reduce((max, person) => Math.max(max, person.id), 0);
            const nextId = maxId + 1;
            state.persons.push({ id: nextId, ...action.payload });
            localStorage.setItem('persons', JSON.stringify(state.persons));
        },

        editPerson: (state, action: PayloadAction<Person>) => {
            const index = state.persons.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.persons[index] = {...state.persons[index], ...action.payload};
                localStorage.setItem('persons', JSON.stringify(state.persons));
            }
        },
        

        deletePerson: (state, action: PayloadAction<number>) => {
            state.persons = state.persons.filter(person => person.id !== action.payload);
            localStorage.setItem('persons', JSON.stringify(state.persons));
        },

        deleteSelectedPersons: (state, action: PayloadAction<number[]>) => {
            state.persons = state.persons.filter(person => !action.payload.includes(person.id));
            localStorage.setItem('persons', JSON.stringify(state.persons));
        },

        setSelectedPerson: (state, action: PayloadAction<Person | null>) => {
            state.selectedPerson = action.payload;
        },
    },
});

export const { addPerson, loadPersons, deletePerson, deleteSelectedPersons, editPerson, setSelectedPerson } = PersonSlice.actions;
export default PersonSlice.reducer;

