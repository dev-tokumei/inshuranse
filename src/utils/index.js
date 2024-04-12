export const getFieldLabel = (fieldName) => {
  switch (fieldName) {
    case 'fullName':
      return 'ФИО'
    case 'phoneNumber':
      return 'Номер телефона'
    case 'email':
      return 'Электронная почта'
    case 'address':
      return 'Адрес'
    case 'vin':
      return 'ВИН'
    case 'registration_number':
      return 'Регистрационный номер'
    default:
      return fieldName
  }
}
