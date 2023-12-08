class Response():
    '''
    result = {\n
        'status': 'success',\n
        'data': {}\n
    }
    '''
    messages = {
        'success': 'this operation was completed successfully',
        'error': 'error occurred during this operation',
        'unique': 'this field must be unique',
        'required': 'this field is required',
        'exists': 'this object already exists',
        'does_not_exist': 'this object does not exist',
        'no_objects': 'no objects available to conduct this operation',
        'unauthenticated': 'this operation requires an authenticated user',
        'unauthorised': 'this operation is not authorised',
        'other': 'unknown error'
    }

    def __init__(self):
        self.result = {
        'status': 'success',
        'data': {}
    }

    def set_message(self, field, message, many=False):
        if not many:
            try:
                self.result['data'][field].append(message)
            except Exception:
                self.result['data'][field] = [message]
            return
        try:
            self.result['data'][field].extend(message)
        except Exception:
            self.result['data'][field] = message

    def set_error(self, field, message='', code='', many=False):
        if code:
            message = self.messages.get(code) or self.messages['other']
        if not self.result['data'].get('errors'):
            self.result['data'] = {'errors': {}}
        self.result['status'] = 'error'
        if not many:
            try:
                self.result['data']['errors'][field].append(message)
            except Exception:
                self.result['data']['errors'][field] = [message]
            return
        try:
            self.result['data']['errors'][field].extend(message)
        except Exception:
            self.result['data']['errors'][field] = message
        
    def set_choice_error(self, field, message, choices):
        message = f'{message}, ' if message else 'choices are '
        for item in choices:
            message += f"'{item}', "
        self.set_error(field, message[:-2])
