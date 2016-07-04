import os
from utils.autoInit import autoInit

def initInterface():
    afficherMenu()

def afficherMenu():
    print('=======================================')
    print('=======================================')
    print('==              M E N U              ==')
    print('=======================================')
    print('==    1 - Créer un feu               ==')
    print('==    2 - Charger un feu             ==')
    print('==    9 - Quitter                    ==')
    print('=======================================')
    print('=======================================')
    while True:
        choix = input('Que souhaitez-vous faire ? ')
        if choix == "1":
            creerFeu()
            break
        elif choix == "2":
            chargerFeu()
            break
        elif choix == "9":
            break
        else:
            print('\nErreur : Choix incorrect')

def creerFeu():
    pas = nbPas()

    show = initCanaux(pas)

    sauverShow(listeCanaux)


def nbPas():
    clear()

    while True:
        pas = input('Combien de pas comporte votre feu ? ')
        try:
            pas = int(pas)
            if pas > 30:
                print("Le feu ne peut contenir plus de 30")
            else:
                break
        except Exception as e:
            print("Erreur : Nombre incorrect")
    return pas

def initCanaux(pas):
    listeDurees = []
    for i in range(0, pas):
        while True:
            duree = input("Saisissez la durée (en s) du pas n°" + str(i+1) + " : ")
            try:
                duree = int(duree)
                listeDurees.append(duree)
                break
            except Exception as e:
                print("Erreur : Nombre incorrect")

    return autoInit(listeDurees)

def sauverShow(show):
    while True:
        choix = input('Votre show est créé. Souhaitez-vous le sauvegarder ? (O/n)')
        if choix == 'O' or choix == 'o' or choix = '':
            print("Le feu ne peut contenir plus de 30")
        elif choix == 'N' or 'n':
            break
        else:
            print("Erreur : Choix incorrect")

def chargerFeu():
    clear()

def clear():
    os.system('clear')
