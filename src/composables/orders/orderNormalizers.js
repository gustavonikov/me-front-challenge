function buildInfoFields(info, keys) {
  return keys
    .map(key => info?.[key] && { type: key, value: info[key] })
    .filter(Boolean)
}

export function normalizeHeader(data) {
  return {
    number: data.number,
    serial: data.serial,
    buyer: data.buyer,
    price: data.price,
    currency: data.currency,
    createdAt: data.createdAt,
    status: data.status,
    billingInfo: buildInfoFields(data.contact, ['name']),
    communicationInfo: buildInfoFields(data.contact, ['email', 'phone', 'fax'])
  }
}

export function normalizeSupplier(data) {
  const documentType = data.document?.type?.toLowerCase()
  const billingFields = {
    [documentType]: data.document?.value,
    address: data.address,
    name: data.contact.name
  }
  const communicationFields = {
    email: data.contact.email,
    phone: data.contact.phone,
    fax: data.contact.fax,
    readAt: data.readAt,
  }

  return {
    code: data.code,
    name: data.name,
    billingInfo: buildInfoFields(billingFields, ['cpnj', 'address', 'name']),
    communicationInfo: buildInfoFields(communicationFields, ['email', 'phone', 'fax', 'readAt'])
  }
}

export function normalizeAddresses(data) {
  return data.map(addr => {
    const documentType = addr.document?.type?.toLowerCase()
    const billingFields = {
      [documentType]: addr.document?.value,
      address: addr.address,
      name: addr.contact.name
    }
    const communicationFields = {
      email: addr.contact.email,
      phone: addr.contact.phone,
      fax: addr.contact.fax,
      readAt: addr.readAt,
    }

    return {
      label: addr.label,
      company: {
        name: addr.name,
        code: addr.code,
        billingInfo: buildInfoFields(billingFields, ['cpnj', 'address', 'name']),
        communicationInfo: buildInfoFields(communicationFields, ['email', 'phone', 'fax'])
      }
    }
  })
}
