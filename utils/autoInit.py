from classe.Canal import Canal

def autoInit(listeDurees):
    listeCanaux = []
    i = 1
    step = 1
    for duree in listeDurees:
        if i > 15:
            step = 2
            i = 1

        if i == 1:
            listeCanaux.append(Canal(4, step, duree))
        elif i == 2:
            listeCanaux.append(Canal(17, step, duree))
        elif i == 3:
            listeCanaux.append(Canal(18, step, duree))
        elif i == 4:
            listeCanaux.append(Canal(27, step, duree))
        elif i == 5:
            listeCanaux.append(Canal(22, step, duree))
        elif i == 6:
            listeCanaux.append(Canal(23, step, duree))
        elif i == 7:
            listeCanaux.append(Canal(24, step, duree))
        elif i == 8:
            listeCanaux.append(Canal(25, step, duree))
        elif i == 9:
            listeCanaux.append(Canal(5, step, duree))
        elif i == 10:
            listeCanaux.append(Canal(6, step, duree))
        elif i == 11:
            listeCanaux.append(Canal(12, step, duree))
        elif i == 12:
            listeCanaux.append(Canal(13, step, duree))
        elif i == 13:
            listeCanaux.append(Canal(19, step, duree))
        elif i == 14:
            listeCanaux.append(Canal(16, step, duree))
        else:
            listeCanaux.append(Canal(26, step, duree))
            
    return listeCanaux
