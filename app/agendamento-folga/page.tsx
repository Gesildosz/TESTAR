"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, User, LogOut, Calendar, Timer, CalendarPlus, ArrowLeft, CheckCircle, Bell } from "lucide-react"
import Link from "next/link"
import Image from "next/image" // Added Image import for JBS logo

export default function AgendamentoFolgaPage() {
  const [selectedDate, setSelectedDate] = useState("")
  const [reason, setReason] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [hasMessages, setHasMessages] = useState(false)

  const currentTime = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const todayDate = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  const positiveBalance = 2.5 // 2h 30m em decimal
  const hasEnoughBalance = positiveBalance >= 1

  const hoursData = [
    { day: "Seg", positive: 2.5, negative: -0.5 },
    { day: "Ter", positive: 1.8, negative: -1.2 },
    { day: "Qua", positive: 3.2, negative: -0.8 },
    { day: "Qui", positive: 2.1, negative: -1.5 },
    { day: "Sex", positive: 4.0, negative: -0.3 },
    { day: "Sáb", positive: 1.5, negative: -2.0 },
    { day: "Dom", positive: 0.8, negative: -0.1 },
  ]

  const chartConfig = {
    positive: {
      label: "Horas Positivas",
      color: "hsl(142, 76%, 36%)",
    },
    negative: {
      label: "Horas Negativas",
      color: "hsl(0, 84%, 60%)",
    },
  }

  const schedulingHistory = [
    {
      id: 1,
      date: "15/08/2025",
      requestDate: "10/08/2025",
      reason: "Consulta médica",
      status: "aprovado",
      hoursUsed: "8h 00m",
    },
    {
      id: 2,
      date: "22/08/2025",
      requestDate: "18/08/2025",
      reason: "Compromisso pessoal",
      status: "pendente",
      hoursUsed: "4h 00m",
    },
    {
      id: 3,
      date: "05/08/2025",
      requestDate: "01/08/2025",
      reason: "Viagem familiar",
      status: "recusado",
      hoursUsed: "8h 00m",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aprovado":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20"
      case "pendente":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20"
      case "recusado":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aprovado":
        return <CheckCircle className="w-4 h-4" />
      case "pendente":
        return <Clock className="w-4 h-4" />
      case "recusado":
        return <Timer className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    if (!hasEnoughBalance) {
      alert("Saldo insuficiente para solicitar folga compensatória.")
      return
    }
    if (!selectedDate || !reason) {
      alert("Por favor, preencha todos os campos.")
      return
    }

    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setSelectedDate("")
      setReason("")
    }, 3000)
  }

  const formatHours = (hours: number) => {
    const h = Math.floor(hours)
    const m = Math.round((hours - h) * 60)
    return `${h}h ${m.toString().padStart(2, "0")}m`
  }

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 md:p-8 bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="w-full mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            </Link>
            <div className="h-12 flex items-center justify-center">
              <Image src="/images/jbs-logo.png" alt="JBS Logo" width={64} height={48} className="object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Agendamento Folga</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Solicitação de Folga Compensatória</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="p-2" onClick={() => setHasMessages(!hasMessages)}>
              <Bell className={`w-5 h-5 ${hasMessages ? "text-red-500" : "text-green-500"}`} />
            </Button>
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow space-y-6">
        {/* Success Message */}
        {showSuccess && (
          <Card className="w-full shadow-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-green-700 dark:text-green-300">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Solicitação enviada com sucesso!</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Time Display Card */}
        <Card className="w-full shadow-lg border-2 border-blue-200 dark:border-blue-700">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold text-blue-700 dark:text-blue-300 flex items-center justify-center gap-2">
              <Clock className="w-6 h-6" />
              Horário Atual
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">{currentTime}</div>
            <div className="text-lg text-gray-600 dark:text-gray-400">{currentDate}</div>
          </CardContent>
        </Card>

        {/* Request Form Card */}
        <Card className="w-full shadow-lg border-2 border-orange-200 dark:border-orange-700">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-orange-700 dark:text-orange-300 flex items-center gap-2">
              <CalendarPlus className="w-5 h-5" />
              Solicitar Folga Compensatória
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasEnoughBalance ? (
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data da Folga</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Motivo da Solicitação</Label>
                  <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Descreva o motivo da sua solicitação de folga compensatória..."
                    className="w-full min-h-[100px]"
                  />
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    <strong>Saldo disponível:</strong> {formatHours(positiveBalance)}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    Você pode solicitar folga compensatória pois possui saldo positivo suficiente.
                  </p>
                </div>
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                  Enviar Solicitação
                </Button>
              </form>
            ) : (
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                <p className="text-red-700 dark:text-red-300 font-semibold">
                  Saldo insuficiente para folga compensatória
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                  Você precisa de pelo menos 1 hora de saldo positivo para solicitar folga compensatória.
                </p>
                <p className="text-sm text-red-600 dark:text-red-400">Saldo atual: {formatHours(positiveBalance)}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Histórico scheduling history card */}
          <Card className="shadow-lg border-2 border-green-200 dark:border-green-700">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-green-700 dark:text-green-300 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Histórico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedulingHistory.length > 0 ? (
                  schedulingHistory.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">Data da Folga: {item.date}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Solicitado em: {item.requestDate}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Motivo: {item.reason}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Horas: {item.hoursUsed}</p>
                        </div>
                        <div
                          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                        >
                          {getStatusIcon(item.status)}
                          <span className="capitalize">{item.status}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Nenhum agendamento encontrado</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Hours Summary Card */}
          <Card className="shadow-lg border-2 border-purple-200 dark:border-purple-700">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Saldo de horas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{todayDate}:</span>
                <span className="font-semibold">0h 00m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium" style={{ color: "hsl(142, 76%, 36%)" }}>
                  Saldo Positivo:
                </span>
                <span className="font-semibold">{formatHours(positiveBalance)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium" style={{ color: "hsl(0, 84%, 60%)" }}>
                  Saldo Negativo:
                </span>
                <span className="font-semibold">0h 00m</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Info Card */}
        <Card className="shadow-lg border-2 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <User className="w-5 h-5" />
              Informações do Colaborador
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Nome:</span>
              <span className="font-semibold">Colaborador</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Crachá:</span>
              <span className="font-semibold">------</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Departamento:</span>
              <span className="font-semibold">------</span>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-sm text-gray-600 dark:text-gray-400 py-4 mt-8">
        <p>&copy; {new Date().getFullYear()} JBS. Todos os direitos reservados.</p>
        <p>Sistema de Ponto - Versão 1.0.0</p>
      </footer>
    </div>
  )
}
