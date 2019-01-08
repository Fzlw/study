def d_decorator(tag):
    def dd(func):
        def d_(*args):
            return f'<{tag}>{func(*args)}</{tag}>'
        return d_
    return dd

@d_decorator('p')
def get_text(text):
    return text.upper()

get_text('liwei')