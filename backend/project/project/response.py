class Response():
    '''
    default = {\n
        'status': 'success',\n
        'data': {}\n
    }
    '''
    default = {
        'status': 'success',
        'data': {}
    }

    def set_message(self, field, message, results):
        results['data'][field] = message

    def set_error(self, field, message, results):
        if not results['data'].get('errors'):
            results['data'] = {'errors': {}}
        results['status'] = 'error'
        results['data']['errors'][field] = message
    
    def set_choice_error(self, field, message, choices, results):
        message = f'{message}, ' if message else 'choices are '
        for item in choices:
            message += f"'{item}', "
        self.set_error(field, message[:-2], results)
