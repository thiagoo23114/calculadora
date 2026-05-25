num1 = float(input("ingrese un numero : "))
num2 = float(input("ingrese otro numero : "))
operador = input("ingrese operador : ")

if operador == "+":
   result = num1 + num2
   print(result)

elif operador == "-":
    result2 = num1 - num2
    print(result2)

elif operador == "*":
    result3 = num1 * num2
    print(result3)

elif operador == "/":
    if num2 == 0:
        print("no se puede dividir por 0")
    else:
        result4 = num1 / num2
        print(result4)

elif operador == "//":
    if num2 == 0:
        print("no se puede dividir por 0")
    else:
        result5 = num1 // num2
        print(result5)

elif operador == "**":
    result6 = num1 ** num2
    print(result6)

else:
    print("Operador no válido")