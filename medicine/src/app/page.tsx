"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash, Edit, Check, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Medicine {
  id: number
  name: string
  frequency: string
  timestamps: Date[]
}

export default function MedicineTrackingApp() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [newMedicineName, setNewMedicineName] = useState('')
  const [newMedicineFrequency, setNewMedicineFrequency] = useState('')
  const [editingMedicineId, setEditingMedicineId] = useState<number | null>(null)
  const [editingMedicineName, setEditingMedicineName] = useState('')
  const [editingMedicineFrequency, setEditingMedicineFrequency] = useState('')

  const addMedicine = () => {
    if (newMedicineName && newMedicineFrequency) {
      const newMedicine: Medicine = {
        id: Date.now(),
        name: newMedicineName,
        frequency: newMedicineFrequency,
        timestamps: []
      }
      setMedicines([...medicines, newMedicine])
      setNewMedicineName('')
      setNewMedicineFrequency('')
    }
  }

  const editMedicine = (id: number) => {
    const medicine = medicines.find(m => m.id === id)
    if (medicine) {
      setEditingMedicineId(id)
      setEditingMedicineName(medicine.name)
      setEditingMedicineFrequency(medicine.frequency)
    }
  }

  const updateMedicine = () => {
    if (editingMedicineId !== null && editingMedicineName && editingMedicineFrequency) {
      const updatedMedicines = medicines.map(m => 
        m.id === editingMedicineId ? 
        { ...m, name: editingMedicineName, frequency: editingMedicineFrequency } : m
      )
      setMedicines(updatedMedicines)
      setEditingMedicineId(null)
      setEditingMedicineName('')
      setEditingMedicineFrequency('')
    }
  }

  const deleteMedicine = (id: number) => {
    setMedicines(medicines.filter(m => m.id !== id))
  }

  const markMedicineAsTaken = (id: number) => {
    const updatedMedicines = medicines.map(m => 
      m.id === id ? { ...m, timestamps: [...m.timestamps, new Date()] } : m
    )
    setMedicines(updatedMedicines)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col p-4">
      <Card className="w-full max-w-4xl mx-auto mb-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Medicine Tracking App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="medicine-name">Medicine Name</Label>
              <Input
                id="medicine-name"
                value={newMedicineName}
                onChange={(e) => setNewMedicineName(e.target.value)}
                placeholder="Enter medicine name"
              />
            </div>
            <div>
              <Label htmlFor="medicine-frequency">Frequency</Label>
              <Input
                id="medicine-frequency"
                value={newMedicineFrequency}
                onChange={(e) => setNewMedicineFrequency(e.target.value)}
                placeholder="Enter frequency"
              />
            </div>
          </div>
          <Button onClick={addMedicine} className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Medicine
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Medicines</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Actions</TableHead>
                <TableHead>Timestamps</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicines.map(medicine => (
                <TableRow key={medicine.id}>
                  <TableCell>
                    {editingMedicineId === medicine.id ? (
                      <Input
                        value={editingMedicineName}
                        onChange={(e) => setEditingMedicineName(e.target.value)}
                      />
                    ) : (
                      medicine.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingMedicineId === medicine.id ? (
                      <Input
                        value={editingMedicineFrequency}
                        onChange={(e) => setEditingMedicineFrequency(e.target.value)}
                      />
                    ) : (
                      medicine.frequency
                    )}
                  </TableCell>
                  <TableCell>
                    {editingMedicineId === medicine.id ? (
                      <Button variant="secondary" onClick={updateMedicine}>
                        <Check className="mr-2 h-4 w-4" /> Save
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" onClick={() => editMedicine(medicine.id)} className="mr-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" onClick={() => deleteMedicine(medicine.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      {medicine.timestamps.map((timestamp, index) => (
                        <div key={index} className="mb-1">
                          {timestamp.toLocaleString()}
                        </div>
                      ))}
                      <Button variant="outline" onClick={() => markMedicineAsTaken(medicine.id)}>
                        Mark as Taken
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}