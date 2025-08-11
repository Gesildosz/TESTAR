"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Clock, User, LogOut, Calendar, Timer, CalendarPlus, Bell } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import Image from "next/image" // Added Image import for JBS logo

export default function DashboardPage() {
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

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 md:p-8 bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="w-full mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="h-12 flex items-center justify-center">
              {/* Substituindo logo Seara por JBS */}
              <Image src="/images/jbs-logo.png" alt="JBS Logo" width={64} height={48} className="object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Banco de Horas</p>
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

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg border-2 border-green-200 dark:border-green-700">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-green-700 dark:text-green-300 flex items-center gap-2">
                <Timer className="w-5 h-5" />
                História
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hoursData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "currentColor" }}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "currentColor" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="positive"
                      stroke={chartConfig.positive.color}
                      strokeWidth={3}
                      dot={{ fill: chartConfig.positive.color, strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="negative"
                      stroke={chartConfig.negative.color}
                      strokeWidth={3}
                      dot={{ fill: chartConfig.negative.color, strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  <span>Horas Positivas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Horas Negativas</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hours Summary Card */}
          <Card className="shadow-lg border-2 border-purple-200 dark:border-purple-700">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Saldo de horas
                <Link href="/agendamento-folga">
                  <Button variant="ghost" size="sm" className="ml-auto p-1 h-auto">
                    <CalendarPlus className="w-4 h-4 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200" />
                  </Button>
                </Link>
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
                <span className="font-semibold">0h 00m</span>
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
        {/* Substituindo Seara por JBS no footer */}
        <p>&copy; {new Date().getFullYear()} JBS. Todos os direitos reservados.</p>
        <p>Sistema de Ponto - Versão 1.0.0</p>
      </footer>
    </div>
  )
}
